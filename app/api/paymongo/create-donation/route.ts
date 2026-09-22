import { NextResponse } from "next/server";
import { Client as AppwriteClient, Databases, ID } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite";

const PAYMONGO_API = "https://api.paymongo.com/v1";
const WALLETS = ["gcash", "paymaya", "grab_pay", "shopeepay"] as const;
type Wallet = (typeof WALLETS)[number];

const WALLET_LABELS: Record<Wallet, string> = {
  gcash: "GCash",
  paymaya: "Maya",
  grab_pay: "GrabPay",
  shopeepay: "ShopeePay",
};

interface DonationBody {
  wallet: Wallet;
  amount: number;
  name?: string;
  email?: string;
  phone?: string;
  note?: string;
}

export async function POST(request: Request) {
  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      {
        error: "PAYMONGO_NOT_CONFIGURED",
        message:
          "Online giving isn't configured yet. Please try again later or give during a service.",
      },
      { status: 503 }
    );
  }

  let body: DonationBody;
  try {
    body = (await request.json()) as DonationBody;
  } catch {
    return NextResponse.json(
      { error: "invalid_json", message: "Invalid request payload." },
      { status: 400 }
    );
  }

  const wallet = body.wallet;
  if (!wallet || !WALLETS.includes(wallet)) {
    return NextResponse.json(
      { error: "invalid_wallet", message: "Please choose a supported e-wallet." },
      { status: 400 }
    );
  }

  const amount = Math.round(Number(body.amount));
  if (!Number.isFinite(amount) || amount < 100 || amount > 10000000) {
    return NextResponse.json(
      {
        error: "invalid_amount",
        message: "Donation amount must be between ₱1.00 and ₱100,000.00.",
      },
      { status: 400 }
    );
  }

  const auth = "Basic " + Buffer.from(`${secretKey}:`).toString("base64");
  const origin = process.env.NEXT_PUBLIC_SITE_URL || new URL(request.url).origin;
  const returnUrl = `${origin.replace(/\/$/, "")}/#donate`;
  const metadata: Record<string, string> = {};
  if (body.name) metadata.name = body.name.slice(0, 255);
  if (body.email) metadata.email = body.email.slice(0, 255);

  try {
    // 1) Create the Payment Intent
    const intentRes = await paymongoFetch(
      `${PAYMONGO_API}/payment_intents`,
      auth,
      {
        data: {
          attributes: {
            amount,
            currency: "PHP",
            payment_method_allowed: [wallet],
            description: `Donation to God's Oracle Ministries (${WALLET_LABELS[wallet]})`,
            metadata,
          },
        },
      }
    );

    const intentAttr = intentRes.attributes;
    const intentId = intentRes.id;
    const clientKey = intentAttr?.client_key;
    if (!intentId || !clientKey) {
      throw new Error("PayMongo did not return a payment intent.");
    }

    // 2) Create a Payment Method for the chosen wallet
    const billing: { name?: string; email?: string; phone?: string } = {};
    if (body.name) billing.name = body.name;
    if (body.email) billing.email = body.email;
    if (body.phone) billing.phone = body.phone;

    const pmRes = await paymongoFetch(
      `${PAYMONGO_API}/payment_methods`,
      auth,
      {
        data: {
          attributes: {
            type: wallet,
            billing: billing.name || billing.email
              ? { name: billing.name ?? "", email: billing.email ?? "", phone: billing.phone ?? "" }
              : undefined,
          },
        },
      }
    );
    const paymentMethodId = pmRes.id;
    if (!paymentMethodId) {
      throw new Error("PayMongo did not create a payment method.");
    }

    // 3) Attach the payment method to the intent
    const attachRes = await paymongoFetch(
      `${PAYMONGO_API}/payment_intents/${intentId}/attach`,
      auth,
      {
        data: {
          attributes: {
            payment_method: paymentMethodId,
            client_key: clientKey,
            return_url: returnUrl,
          },
        },
      }
    );

    const finalAttr = attachRes.attributes;
    const status: string = finalAttr?.status ?? "";
    const redirectUrl: string | undefined = finalAttr?.next_action?.redirect?.url;

    // 4) Record a pending donation
    await recordDonation({
      name: body.name,
      email: body.email,
      phone: body.phone,
      amount,
      wallet,
      note: body.note,
      intentId,
      status,
    });

    if (status === "awaiting_next_action" && redirectUrl) {
      return NextResponse.json({ redirectUrl, intentId });
    }

    // Payment already completed or failed without a redirect
    return NextResponse.json({
      redirectUrl: null,
      intentId,
      status: status === "succeeded" ? "paid" : status,
    });
  } catch (error) {
    const err = error as { message?: string; paymongo?: PayMongoError };
    if (err.paymongo) {
      return NextResponse.json(
        { error: err.paymongo.code, message: friendlyPayMongoError(err.paymongo) },
        { status: 400 }
      );
    }
    console.error("Failed to create donation:", err.message);
    return NextResponse.json(
      { error: "gateway_error", message: "We couldn't reach the payment gateway. Please try again." },
      { status: 502 }
    );
  }
}

interface PayMongoError {
  code: string;
  detail: string;
  message?: string;
  attribute?: string;
}

function friendlyPayMongoError(err: PayMongoError): string {
  const isAmount = err.attribute === "amount";
  if (isAmount || err.code === "parameter_below_minimum") {
    return "That amount is too small. Donations must be at least ₱1.00.";
  }
  if (isAmount || err.code === "parameter_above_maximum") {
    return "That amount is too large. Maximum is ₱100,000.00 per transaction.";
  }
  return err.detail || err.message || "The payment couldn't be started. Please try again.";
}

interface PayMongoData {
  id?: string;
  attributes?: {
    status?: string;
    client_key?: string;
    next_action?: { redirect?: { url?: string } };
  };
}

async function paymongoFetch(
  path: string,
  auth: string,
  body: unknown
): Promise<PayMongoData> {
  const res = await fetch(path, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: auth,
    },
    body: JSON.stringify(body),
  });

  const json = (await res.json().catch(() => ({}))) as {
    data?: PayMongoData;
    errors?: PayMongoError[];
  };
  if (!res.ok) {
    const first = json?.errors?.[0];
    const error = new Error(first?.detail ?? "PayMongo request failed") as Error & {
      paymongo?: PayMongoError;
    };
    error.paymongo = first;
    throw error;
  }
  return json?.data ?? { id: undefined, attributes: undefined };
}

async function recordDonation(args: {
  name?: string;
  email?: string;
  phone?: string;
  amount: number;
  wallet: string;
  note?: string;
  intentId: string;
  status: string;
}) {
  const client = new AppwriteClient()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  const databases = new Databases(client);
  await databases.createDocument(
    appwriteConfig.databaseId,
    appwriteConfig.donationsCollectionId,
    ID.unique(),
    {
      name: args.name ?? "",
      email: args.email ?? "",
      phone: args.phone ?? "",
      amount: args.amount,
      currency: "PHP",
      wallet: args.wallet,
      note: args.note ?? "",
      intentId: args.intentId,
      status: args.status === "succeeded" ? "paid" : "pending",
      createdAt: new Date().toISOString(),
    }
  );
}