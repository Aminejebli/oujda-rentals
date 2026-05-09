import type { Metadata } from "next";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { defaultLocale } from "@/lib/i18n";
import "./globals.css";

export const metadata: Metadata = {
  title: "Oujda Rentals | Location Voiture Maroc | تأجير سيارات وجدة",
  description: "Plateforme de location de voitures à Oujda. Comparez les prix, contactez directement les agences sur WhatsApp. Service rapide et sécurisé au Maroc.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} className="h-full antialiased" suppressHydrationWarning>
      <body className="flex min-h-full flex-col font-sans">
        <ThemeProvider>
          <ErrorBoundary>
            <PerformanceMonitor />
            {children}
          </ErrorBoundary>
        </ThemeProvider>
      </body>
    </html>
  );
}
