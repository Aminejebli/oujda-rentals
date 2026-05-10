"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";
import { getMyProfile, updateMyProfile, type ProfileRow } from "@/lib/profile";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";

export default function ProfilePage() {
  const params = useParams();
  const router = useRouter();
  const locale = (params?.locale as Locale) ?? defaultLocale;

  const { session, loading } = useAuth();

  const [profile, setProfile] = useState<ProfileRow | null>(null);
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");

  const [fetching, setFetching] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    if (!loading && !session) {
      router.replace(`/${locale}/login`);
      return;
    }

    if (!loading) {
      (async () => {
        try {
          setFetching(true);
          const next = await getMyProfile();
          setProfile(next);

          setFullName(next?.full_name ?? "");
          setPhone(next?.phone ?? "");
        } catch (e) {
          setError(e instanceof Error ? e.message : "Failed to load profile.");
        } finally {
          setFetching(false);
        }
      })();
    }
  }, [loading, session, router, locale]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!profile) return;

    setSubmitting(true);
    setError(null);
    setSaved(false);

    try {
      await updateMyProfile({
        full_name: fullName.trim(),
        phone: phone.trim(),
      });

      const next = await getMyProfile();
      setProfile(next);
      setSaved(true);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Profile update failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight">Profile</h1>
      <p className="mt-2 text-sm text-slate-600">Update your Oujda Rentals user info.</p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        {fetching ? (
          <div className="text-sm text-slate-600">Loading…</div>
        ) : (
          <form onSubmit={onSubmit} className="space-y-4">
            <label className="block">
              <span className="text-sm font-medium">Full name</span>
              <input
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                type="text"
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
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
                placeholder="e.g. 06xxxxxx"
                required
              />
            </label>

            {error ? (
              <div className="rounded-lg border border-red-400 bg-red-50 px-3 py-2 text-sm text-red-700">
                {error}
              </div>
            ) : null}

            {saved ? (
              <div className="rounded-lg border border-emerald-400 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
                Profile saved.
              </div>
            ) : null}

            <button
              type="submit"
              disabled={submitting}
              className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-semibold shadow-soft transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving…" : "Save changes"}
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
