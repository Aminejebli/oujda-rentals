import Link from "next/link";

export function Header() {
  return (
    <header className="border-b border-slate-200 bg-white px-5">
      <div className="mx-auto flex max-w-6xl items-center justify-between py-4">
        <Link href="/" className="text-lg font-bold text-slate-950">
          Oujda Rentals
        </Link>

        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link href="/cars" className="text-slate-600 hover:text-slate-950">
            Cars
          </Link>

          <Link
            href="/agencies"
            className="text-slate-600 hover:text-slate-950"
          >
            Agencies
          </Link>

          <a
            href="https://wa.me/212600000000?text=Salam, I want to ask about car rentals in Oujda."
            className="rounded-md bg-emerald-700 px-4 py-2 text-white transition hover:bg-emerald-800"
          >
            WhatsApp
          </a>
        </nav>
      </div>
    </header>
  );
}
