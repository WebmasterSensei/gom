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
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-b from-[#faf7f0] via-[#f4ecdf] to-[#efe4d3] px-4">
      {/* Decorative gold glows */}
      <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-[#c9a227]/20 blur-3xl"></div>
      <div className="absolute -bottom-40 -right-40 h-96 w-96 rounded-full bg-[#7d2e3d]/15 blur-3xl"></div>

      <div className="relative w-full max-w-md">
        <div className="overflow-hidden rounded-[1.75rem] border border-[#e5dcc8] bg-white/80 p-8 shadow-[0_30px_60px_-15px_rgba(99,70,20,0.25)] backdrop-blur-lg sm:p-10">
          <div className="mb-8 text-center">
            <Image
              src="/images/gomlogo.png"
              alt="God's Oracle Ministries logo"
              width={84}
              height={84}
              className="mx-auto mb-4 rounded-full border-2 border-[#d8c48a] object-cover shadow-md"
            />
            <h1 className="font-serif text-3xl font-semibold text-[#33281a]">
              Welcome Back
            </h1>
            <p className="mt-1 text-sm text-[#7c6f5a]">
              Sign in to minister &amp; manage God&apos;s work
            </p>
            <div className="mx-auto mt-4 h-px w-16 bg-gradient-to-r from-transparent via-[#c9a227] to-transparent"></div>
          </div>

          {error && (
            <div className="mb-5 rounded-xl border border-[#d3a4ab] bg-[#7d2e3d]/10 px-4 py-3 text-sm text-[#7d2e3d]">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-[#4a3f2c]">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e2d8c2] bg-[#fbf8f1] px-4 py-3 text-[#33281a] placeholder-[#b3a68a] transition focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium text-[#4a3f2c]">
                Password
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full rounded-xl border border-[#e2d8c2] bg-[#fbf8f1] px-4 py-3 text-[#33281a] placeholder-[#b3a68a] transition focus:border-[#c9a227] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/30"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-gradient-to-r from-[#b8860b] to-[#c9a227] py-3 font-semibold text-white shadow-lg transition hover:from-[#a37408] hover:to-[#b8860b] focus:outline-none focus:ring-2 focus:ring-[#c9a227]/50 disabled:cursor-not-allowed disabled:opacity-60"
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
            className="mt-6 block text-center text-sm text-[#8a7a5c] underline-offset-4 transition hover:text-[#7d2e3d] hover:underline"
          >
            ← Back to website
          </Link>
        </div>
      </div>
    </div>
  );
}