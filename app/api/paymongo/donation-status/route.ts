import { NextResponse } from "next/server";
import { Client as AppwriteClient, Databases, Query } from "node-appwrite";
import { appwriteConfig } from "@/lib/appwrite";

const PAYMONGO_API = "https://api.paymongo.com/v1";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const intentId =
    searchParams.get("intentId") || searchParams.get("payment_intent_id");

  if (!intentId) {
    return NextResponse.json(
      { error: "missing_intent_id", message: "Missing payment intent." },
      { status: 400 }
    );
  }

  const secretKey = process.env.PAYMONGO_SECRET_KEY;
  if (!secretKey) {
    return NextResponse.json(
      { error: "PAYMONGO_NOT_CONFIGURED", message: "PayMongo isn't configured." },
      { status: 503 }
    );
  }

  try {
    const res = await fetch(`${PAYMONGO_API}/payment_intents/${intentId}`, {
      headers: {
        Authorization: "Basic " + Buffer.from(`${secretKey}:`).toString("base64"),
      },
      cache: "no-store",
    });

    const json = (await res.json().catch(() => ({}))) as {
      data?: {
        attributes?: {
          status?: string;
          payments?: { id?: string }[];
        };
      };
      errors?: { code?: string; detail?: string }[];
    };
    if (!res.ok) {
      const first = json?.errors?.[0];
      return NextResponse.json(
        { error: first?.code ?? "gateway_error", message: first?.detail ?? "Could not verify payment." },
        { status: 502 }
      );
    }

    const attr = json?.data?.attributes ?? {};
    const status = normalizeStatus(String(attr.status ?? ""));
    const paymentId = attr.payments?.[0]?.id ?? "";

    await updateDonation(intentId, status, paymentId);

    return NextResponse.json({
      intentId,
      status,
      paid: status === "paid",
    });
  } catch (error) {
    console.error("Failed to check donation status:", error);
    return NextResponse.json(
      { error: "gateway_error", message: "Could not verify payment. Please try again." },
      { status: 502 }
    );
  }
}

function normalizeStatus(status: string): string {
  switch (status) {
    case "succeeded":
      return "paid";
    case "canceled":
      return "failed";
    case "awaiting_payment_method":
    case "awaiting_next_action":
      return "pending";
    default:
      return status;
  }
}

async function updateDonation(intentId: string, status: string, paymentId: string) {
  const client = new AppwriteClient()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId)
    .setKey(appwriteConfig.apiKey);

  const databases = new Databases(client);

  let docId: string | null = null;
  let currentStatus: string | undefined;
  try {
    const result = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.donationsCollectionId,
      [Query.equal("intentId", [intentId]), Query.limit(1)]
    );
    docId = result.documents[0]?.$id ?? null;
    currentStatus = result.documents[0]?.status ?? undefined;
  } catch (error) {
    console.error("Failed to find donation record:", error);
    return;
  }

  if (!docId) return;

  // Only mark as paid; never downgrade an already-paid record.
  if (status === "paid" && currentStatus !== "paid") {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.donationsCollectionId,
      docId,
      {
        status,
        ...(paymentId ? { paymentId } : {}),
      }
    );
  } else if (status !== "paid" && currentStatus === "pending") {
    await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.donationsCollectionId,
      docId,
      { status }
    );
  }
}