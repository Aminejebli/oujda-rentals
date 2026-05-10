"use client";

import { useState } from "react";
import { useRouter, useParams } from "next/navigation";
import type { Locale } from "@/lib/i18n";
import { defaultLocale } from "@/lib/i18n";
import { supabase } from "@/lib/supabase";

export default function ApplyAgencyPage() {
  const router = useRouter();
  const params = useParams();
  const locale = (params?.locale as Locale) ?? defaultLocale;

  const [agencyName, setAgencyName] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  function canSubmit() {
    return agencyName.trim().length >= 2 && address.trim().length >= 3 && phone.trim().length >= 6;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit() || submitting) return;

    setSubmitting(true);
    setError(null);
    setSuccess(false);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw new Error(userError.message);
      if (!user) throw new Error("You must be logged in to apply.");

      const { error: insertError } = await supabase.from("agency_applications").insert({
        user_id: user.id,
        agency_name: agencyName.trim(),
        address: address.trim(),
        phone: phone.trim(),
        status: "pending",
      });

      if (insertError) throw new Error(insertError.message);

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Application failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight">Apply to become an agency</h1>
      <p className="mt-2 text-sm text-slate-600">
        Submit your details. We will review your application.
      </p>

      <div className="mt-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-950">
        <form onSubmit={onSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm font-medium">Agency name</span>
            <input
              value={agencyName}
              onChange={(e) => setAgencyName(e.target.value)}
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="e.g. Atlas Cars Oujda"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-medium">Address</span>
            <input
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              type="text"
              className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 outline-none focus:ring-2 focus:ring-emerald-600"
              placeholder="e.g. Oujda Airport"
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

          {success ? (
            <div className="rounded-lg border border-emerald-400 bg-emerald-50 px-3 py-2 text-sm text-emerald-800">
              Application submitted! (Pending admin review.)
            </div>
          ) : null}

          <button
            type="submit"
            disabled={!canSubmit() || submitting}
            className="w-full rounded-lg border border-black bg-white px-4 py-2 text-sm font-semibold shadow-soft transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Submitting..." : "Submit application"}
          </button>

          <button
            type="button"
            onClick={() => router.replace(`/${locale}/agencies`)}
            className="w-full rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-semibold shadow-soft transition hover:bg-slate-50"
          >
            Back to agencies
          </button>
        </form>
      </div>
    </main>
  );
}
