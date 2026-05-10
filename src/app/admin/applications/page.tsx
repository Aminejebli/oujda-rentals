"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type AgencyApplication = {
  id: string;
  user_id: string;
  agency_name: string;
  address: string;
  phone: string;
  status: "pending" | "approved" | "rejected";
  created_at: string;
};

export default function AdminApplicationsPage() {
  const [loading, setLoading] = useState(true);
  const [submittingId, setSubmittingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [items, setItems] = useState<AgencyApplication[]>([]);

  async function load() {
    setLoading(true);
    setError(null);

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) {
      setItems([]);
      setLoading(false);
      return;
    }

    const { data, error: selectError } = await supabase
      .from("agency_applications")
      .select("id, user_id, agency_name, address, phone, status, created_at")
      .eq("status", "pending")
      .order("created_at", { ascending: true });

    if (selectError) {
      setError(selectError.message);
      setItems([]);
      setLoading(false);
      return;
    }

    setItems((data ?? []) as AgencyApplication[]);
    setLoading(false);
  }

  useEffect(() => {
    (async () => {
      await load();
    })();
  }, []);

  async function updateStatus(id: string, status: "approved" | "rejected") {
    setSubmittingId(id);
    setError(null);

    const { error: updateError } = await supabase
      .from("agency_applications")
      .update({ status })
      .eq("id", id);

    if (updateError) {
      setError(updateError.message);
      setSubmittingId(null);
      return;
    }

    // refresh list
    await load();
    setSubmittingId(null);
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-black tracking-tight">Agency Applications</h1>
      <p className="mt-2 text-sm text-slate-600">Approve or reject agency requests from users.</p>

      {error ? (
        <div className="mt-4 rounded-lg border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      ) : null}

      {loading ? (
        <div className="mt-6 text-sm text-slate-600">Loading…</div>
      ) : (
        <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 dark:border-slate-800">
          {items.length === 0 ? (
            <div className="p-6 text-sm text-slate-600">No pending applications.</div>
          ) : (
            <div className="divide-y divide-slate-200 dark:divide-slate-800">
              {items.map((app) => (
                <div key={app.id} className="p-5">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <div>
                      <div className="text-base font-bold">{app.agency_name}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">{app.address}</div>
                      <div className="text-sm text-slate-600 dark:text-slate-300">Phone: {app.phone}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        Submitted: {new Date(app.created_at).toLocaleString()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        disabled={submittingId === app.id}
                        onClick={() => updateStatus(app.id, "approved")}
                        className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:opacity-60"
                      >
                        {submittingId === app.id ? "Working…" : "Approve"}
                      </button>
                      <button
                        type="button"
                        disabled={submittingId === app.id}
                        onClick={() => updateStatus(app.id, "rejected")}
                        className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm ring-1 ring-slate-200 transition hover:bg-slate-50 disabled:opacity-60 dark:bg-slate-900 dark:text-slate-100 dark:ring-slate-700"
                      >
                        Reject
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  );
}
