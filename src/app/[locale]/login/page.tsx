"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export default function LoginPage() {
  const router = useRouter();
  const { signInWithEmail, signInWithGoogle, session, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const canSubmit = useMemo(() => email.trim().length > 3 && password.length >= 6, [email, password]);

  if (!loading && session) {
    router.replace("/cars");
    return null;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit) return;

    setSubmitting(true);
    setError(null);
    try {
      await signInWithEmail(email.trim(), password);
      router.replace("/cars");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    } finally {
      setSubmitting(false);
    }
  }

  async function onGoogle() {
    setSubmitting(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Google sign-in failed");
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight">Login</h1>
      <p className="mt-2 text-sm text-slate-600">Oujda-only marketplace sign-in.</p>

      <form onSubmit={onSubmit} className="mt-6 space-y-4">
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
            autoComplete="current-password"
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
          {submitting ? "Signing in..." : "Sign in"}
        </button>

        <button
          type="button"
          onClick={onGoogle}
          disabled={submitting}
          className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-semibold shadow-soft transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Continue with Google
        </button>

        <p className="text-center text-sm text-slate-600">
          Dont have an account?{" "}
          <a className="font-semibold text-emerald-700 hover:underline" href="./../signup">
            Sign up
          </a>
        </p>
      </form>
    </main>
  );
}
