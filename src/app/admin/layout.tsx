import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { defaultLocale } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Admin Oujda Rentals",
  description: "Dashboard de gestion léger pour les agences et les véhicules de location.",
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const messages = (await import(`../../messages/${defaultLocale}.json`)).default;

  return (
    <NextIntlClientProvider locale={defaultLocale} messages={messages}>
      <section className="min-h-screen bg-slate-100 dark:bg-slate-950">{children}</section>
    </NextIntlClientProvider>
  );
}
