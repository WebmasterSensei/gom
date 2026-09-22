"use client";

import {
  HandCoins,
  ShieldCheck,
  Wallet,
  CheckCircle2,
  Loader2,
  XCircle
} from "lucide-react";
import { useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import SectionHeading from "./partials/section-heading";
import NavBar from "./navbar";

type WalletId = "gcash" | "paymaya" | "grab_pay" | "shopeepay";

const wallets: { id: WalletId; label: string; hint: string; chip: string }[] = [
  {
    id: "gcash",
    label: "GCash",
    hint: "Philippines' #1 wallet",
    chip: "bg-[#007DFE]/15 text-[#0066d6] border-[#007DFE]/30"
  },
  {
    id: "paymaya",
    label: "Maya",
    hint: "Send money, pay bills",
    chip: "bg-[#f3cb11]/20 text-[#6f2c91] border-[#6f2c91]/25"
  },
  {
    id: "grab_pay",
    label: "GrabPay",
    hint: "Mobile wallet in Grab",
    chip: "bg-[#00B14F]/15 text-[#01873d] border-[#00B14F]/30"
  },
  {
    id: "shopeepay",
    label: "ShopeePay",
    hint: "Wallet in Shopee",
    chip: "bg-[#EE4D2D]/15 text-[#d63c1e] border-[#EE4D2D]/30"
  }
];

const presets = [100, 250, 500, 1000];

type DonationPhase = "idle" | "submitting" | "redirecting" | "verifying";
type Banner = { kind: "paid" | "pending" | "failed"; message: string } | null;

export default function Donate() {
  const root = useRef<HTMLElement>(null);

  const [wallet, setWallet] = useState<WalletId>("gcash");
  const [amount, setAmount] = useState<number>(500);
  const [customAmount, setCustomAmount] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [note, setNote] = useState("");
  const [phase, setPhase] = useState<DonationPhase>("idle");
  const [banner, setBanner] = useState<Banner>(null);
  const [error, setError] = useState<string | null>(null);

  useGSAP(
    () => {
      gsap.fromTo(
        ".give-card",
        { opacity: 0, y: 44 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.15,
          scrollTrigger: { trigger: root.current, start: "top 76%" }
        }
      );
    },
    { scope: root }
  );

  // Verify a just-returned payment (PayMongo appends ?payment_intent_id=...)
  useEffect(() => {
    const verifyReturn = async () => {
      const params = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      if (hash.includes("?")) {
        const qs = hash.slice(hash.indexOf("?") + 1);
        new URLSearchParams(qs).forEach((value, key) => params.set(key, value));
      }
      const intentId =
        params.get("payment_intent_id") || params.get("intentId");
      if (!intentId) return;

      setPhase("verifying");
      try {
        const res = await fetch(
          `/api/paymongo/donation-status?intentId=${encodeURIComponent(intentId)}`
        );
        const data = (await res.json()) as {
          status?: string;
          message?: string;
        };
        if (data.status === "paid") {
          setBanner({
            kind: "paid",
            message:
              "Thank you! Your donation has been received. God bless you richly."
          });
        } else if (data.status === "failed") {
          setBanner({
            kind: "failed",
            message: "Your donation wasn't completed. Please try again."
          });
        } else {
          setBanner({
            kind: "pending",
            message:
              "We're still confirming your donation. If you completed the payment, it will reflect shortly."
          });
        }
      } catch {
        setBanner({
          kind: "pending",
          message:
            "We couldn't confirm your donation just now. Please try again."
        });
      } finally {
        setPhase("idle");
        const url = new URL(window.location.href);
        url.hash = "donate";
        history.replaceState(null, "", url.toString());
      }
    };

    verifyReturn();
  }, []);

  const effectiveAmount = presets.includes(amount)
    ? amount
    : Number(customAmount) || 0;

  const setPreset = (value: number) => {
    setAmount(value);
    setCustomAmount("");
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const finalAmount = presets.includes(amount)
      ? amount
      : Number(customAmount);

    if (!finalAmount || finalAmount < 1 || finalAmount > 100000) {
      setError("Please enter an amount between ₱1 and ₱100,000.");
      return;
    }

    setError(null);
    setBanner(null);
    setPhase("submitting");

    try {
      const res = await fetch("/api/paymongo/create-donation", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          wallet,
          amount: Math.round(finalAmount * 100),
          name: name.trim(),
          email: email.trim(),
          phone: phone.trim(),
          note: note.trim()
        })
      });

      const data = (await res.json()) as {
        redirectUrl?: string | null;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        setPhase("idle");
        setError(data.message || "Something went wrong. Please try again.");
        return;
      }

      if (data.redirectUrl) {
        setPhase("redirecting");
        window.location.assign(data.redirectUrl);
        return;
      }

      setPhase("idle");
      setBanner({
        kind: "paid",
        message: "Your donation was confirmed. Thank you!"
      });
      setAmount(500);
      setCustomAmount("");
    } catch {
      setPhase("idle");
      setError("We couldn't reach the payment gateway. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-sand bg-white px-4 py-3 text-sm text-ink placeholder:text-muted-warm/60 outline-none transition focus:border-gold focus:ring-1 focus:ring-gold";

  const formatPeso = (value: number) =>
    new Intl.NumberFormat("en-PH", {
      style: "currency",
      currency: "PHP",
      maximumFractionDigits: 0
    }).format(value);

  return (
    <section id="donate" ref={root} className="bg-cream-dark/60 py-24 sm:py-32">
      <NavBar />
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading
          overline="Support the Ministry"
          title="Give Through Your E-Wallet"
          subtitle="Every gift helps us continue worship, outreach, and care for our community. Donate securely with GCash, Maya, GrabPay, or ShopeePay."
        />

        <div className="mt-14 grid gap-8 lg:grid-cols-5">
          {/* Info */}
          <div className="give-card space-y-5 lg:col-span-2">
            <div className="rounded-2xl border border-gold/30 bg-gradient-to-br from-[#3f3120] to-[#2a2115] p-6 text-cream sm:p-8">
              <span className="inline-flex items-center gap-2 rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-gold">
                <HandCoins size={14} />
                Give Online
              </span>
              <h3 className="mt-4 font-serif text-2xl font-semibold leading-snug">
                “Give, and it will be given to you…”
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-cream/75">
                Your generosity sustains the work of the ministry — from weekly
                services and outreach programs to caring for families in need.
              </p>
              <p className="mt-3 text-sm font-semibold uppercase tracking-[0.25em] text-gold">
                Luke 6:38
              </p>
            </div>

            <div className="rounded-2xl border border-sand bg-white p-6">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-gold-deep to-gold text-white shadow-md">
                  <ShieldCheck size={20} />
                </span>
                <div>
                  <h4 className="font-semibold text-ink">
                    Secure &amp; Simple
                  </h4>
                  <p className="text-xs text-muted-warm">
                    Payments are processed by PayMongo, a trusted PH gateway.
                  </p>
                </div>
              </div>
              <ul className="mt-5 space-y-2.5 text-sm text-ink-soft">
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-gold-deep"
                  />
                  Powered by Bangko Sentral-licensed PayMongo
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-gold-deep"
                  />
                  No card details are stored on this site
                </li>
                <li className="flex items-start gap-2.5">
                  <CheckCircle2
                    size={16}
                    className="mt-0.5 shrink-0 text-gold-deep"
                  />
                  Every peso goes to God&apos;s Oracle Ministries
                </li>
              </ul>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="give-card rounded-2xl border border-sand bg-white p-6 shadow-sm sm:p-8 lg:col-span-3"
          >
            {banner && (
              <div
                className={cn(
                  "mb-6 flex items-start gap-3 rounded-xl border px-4 py-3 text-sm",
                  banner.kind === "paid" &&
                    "border-green-200 bg-green-50 text-green-800",
                  banner.kind === "pending" &&
                    "border-amber-200 bg-amber-50 text-amber-800",
                  banner.kind === "failed" &&
                    "border-red-200 bg-red-50 text-red-700"
                )}
              >
                {banner.kind === "paid" ? (
                  <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
                ) : banner.kind === "pending" ? (
                  <Loader2 size={18} className="mt-0.5 shrink-0 animate-spin" />
                ) : (
                  <XCircle size={18} className="mt-0.5 shrink-0" />
                )}
                <span>{banner.message}</span>
              </div>
            )}

            {/* Amount */}
            <div>
              <label className="mb-2 block text-sm font-medium text-ink-soft">
                Donation Amount
              </label>
              <div className="flex flex-wrap gap-2.5">
                {presets.map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => setPreset(preset)}
                    className={cn(
                      "rounded-full border px-5 py-2.5 text-sm font-semibold transition",
                      amount === preset && !customAmount
                        ? "border-gold bg-gradient-to-r from-gold-deep to-gold text-white shadow-md shadow-gold/25"
                        : "border-sand bg-cream text-ink-soft hover:border-gold hover:text-gold-deep"
                    )}
                  >
                    {formatPeso(preset)}
                  </button>
                ))}
              </div>
              <div className="relative mt-3">
                <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-muted-warm">
                  ₱
                </span>
                <input
                  type="number"
                  min={1}
                  max={100000}
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value);
                    setAmount(0);
                    setError(null);
                  }}
                  placeholder="Or enter a custom amount"
                  className={cn(inputClass, "pl-8")}
                />
              </div>
            </div>

            {/* Wallet */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium text-ink-soft">
                Pay With
              </label>
              <div className="grid gap-2.5 sm:grid-cols-2">
                {wallets.map((w) => (
                  <button
                    key={w.id}
                    type="button"
                    onClick={() => setWallet(w.id)}
                    className={cn(
                      "flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition",
                      wallet === w.id
                        ? "border-gold bg-cream shadow-sm ring-1 ring-gold/40"
                        : "border-sand bg-white hover:border-gold/50 hover:bg-cream"
                    )}
                  >
                    <span
                      className={cn(
                        "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border",
                        w.chip
                      )}
                    >
                      <Wallet size={18} />
                    </span>
                    <span>
                      <span className="block text-sm font-semibold text-ink">
                        {w.label}
                      </span>
                      <span className="block text-xs text-muted-warm">
                        {w.hint}
                      </span>
                    </span>
                    <span
                      className={cn(
                        "ml-auto h-4 w-4 rounded-full border-2",
                        wallet === w.id ? "border-gold bg-gold" : "border-sand"
                      )}
                    ></span>
                  </button>
                ))}
              </div>
            </div>

            {/* Details */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-soft">
                  Name (optional)
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-soft">
                  Email (optional)
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="For your giving record"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-ink-soft">
                  Phone (optional)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="09XX XXX XXXX"
                  className={inputClass}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm font-medium text-ink-soft">
                  Note / Prayer Request (optional)
                </label>
                <input
                  type="text"
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="e.g. Tithe, Building fund, Missions…"
                  className={inputClass}
                />
              </div>
            </div>

            {error && (
              <p className="mt-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={phase === "submitting" || phase === "redirecting"}
              className="give-cta mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-r from-gold-deep to-gold px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-gold/30 transition hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {phase === "submitting" || phase === "verifying" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Please wait…
                </>
              ) : phase === "redirecting" ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Opening {wallets.find((w) => w.id === wallet)?.label}…
                </>
              ) : (
                <>
                  <HandCoins size={16} />
                  Give {effectiveAmount > 0 ? formatPeso(effectiveAmount) : ""}
                </>
              )}
            </button>

            <p className="mt-4 text-center text-xs text-muted-warm">
              Min ₱1 · Max ₱100,000 per transaction. You&apos;ll complete your
              donation inside your chosen wallet&apos;s app.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
