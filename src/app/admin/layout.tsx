import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Oujda Rentals",
  description: "Dashboard de gestion léger pour les agences et les véhicules de location.",
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <section className="min-h-screen bg-slate-100">
      {children}
    </section>
  );
}
