import type { Metadata } from "next";
import { Header } from "@/components/Header";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { PerformanceMonitor } from "@/components/PerformanceMonitor";
import "./globals.css";

export const metadata: Metadata = {
  title: "Location Voiture Oujda | Louez facilement | تأجير سيارات وجدة",
  description: "Comparez les agences de location de voitures à Oujda. Prix transparents, contact direct WhatsApp, livraison aéroport.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <ErrorBoundary>
          <PerformanceMonitor />
          <Header />
          {children}
        </ErrorBoundary>
      </body>
    </html>
  );
}
