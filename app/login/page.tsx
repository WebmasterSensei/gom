"use client";
import { useState } from "react";
import { useAuth } from "@appwrite.io/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    signIn.emailPassword({
      email,
      password,
      onSuccess: () => {
        setLoading(false);
        router.push("/auth");
        router.refresh();
      },
      onError: (err) => {
        setLoading(false);
        setError(err.message || "Invalid credentials. Please try again.");
      },
    });
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4">
      {/* Decorative liquid glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-gold/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-burgundy/20 blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="glass-panel overflow-hidden rounded-[1.75rem] p-8 sm:p-10">
          <div className="mb-8 text-center">
            <Image
              src="/images/gomlogo.png"
              alt="God's Oracle Ministries logo"
              width={84}
              height={84}
              className="mx-auto mb-4 rounded-full border-2 border-gold/50 object-cover shadow-md"
            />
            <h1 className="font-serif text-3xl font-semibold text-cream">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-cream/60">
              Sign in to minister &amp; manage God&apos;s work
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-gold to-transparent"></div>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-burgundy/40 bg-burgundy/15 px-4 py-3 text-sm text-[#f2b3c6]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-cream/85">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input-glass"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-cream/85">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input-glass"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn-gold w-full py-3 shadow-[0_20px_40px_-14px_rgba(184,134,11,0.7)] disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="h-5 w-5 animate-spin" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Signing in&hellip;
                </span>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          <Link
            href="/"
            className="mt-6 block text-center text-sm text-cream/60 underline-offset-4 transition hover:text-gold hover:underline"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}