"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AuthCallbackPage() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const url = new URL(window.location.href);
    const code = url.searchParams.get("code");

    if (!code) {
      queueMicrotask(() => setError("Missing authorization code."));
      return;
    }

    (async () => {
      try {
        // Exchange OAuth code for a Supabase session (cookie).
        const { error } = await supabase.auth.exchangeCodeForSession(code);
        if (error) throw error;

        // After successful sign-in, go to the cars page.
        router.replace("/fr/cars");
      } catch (e) {
        setError(e instanceof Error ? e.message : "OAuth callback failed.");
      }
    })();
  }, [router]);

  return (
    <main className="mx-auto max-w-lg px-6 py-10">
      <h1 className="text-2xl font-black">Signing you in...</h1>
      {error ? (
        <p className="mt-4 rounded-lg border border-red-400 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}
    </main>
  );
}
