"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import type React from "react";

export default function SignupPage() {
  const router = useRouter();
  const { signUpWithEmail, session, loading } = useAuth();

  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => {
    return fullName.trim().length >= 2 && phone.trim().length >= 6 && email.trim().length > 3 && password.length >= 6;
  }, [fullName, phone, email, password]);

  if (!loading && session) {
    router.replace("/profile");
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);

    try {
      // Supabase Auth: only email/password here (profile table comes in Piece 1.2)
      await signUpWithEmail(email.trim(), password);

      // After signup, supabase may require email confirmation depending on your project settings.
      // We redirect to login so user can complete the flow.
      router.replace("/login");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Sign up failed");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight">Sign up</h1>
      <p className="mt-2 text-sm text-slate-600">Create your Oujda Rentals account (free).</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-medium">Full name</span>
          <input
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="e.g. Amal El Amrani"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Phone</span>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            autoComplete="tel"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="e.g. 06xxxxxx"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Email</span>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="you@example.com"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-medium">Password</span>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            autoComplete="new-password"
            className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
            placeholder="••••••••"
            required
          />
        </label>

        {error ? (
          <div className="rounded-lg border border-red-400 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        ) : null}

        <button
          type="submit"
          disabled={!canSubmit || submitting}
          className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-semibold shadow-soft transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Creating account..." : "Create account"}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-slate-600">
        Already have an account?{" "}
        <a className="font-semibold text-emerald-700 hover:underline" href="./../login">
          Log in
        </a>
      </p>
    </main>
  );
}
