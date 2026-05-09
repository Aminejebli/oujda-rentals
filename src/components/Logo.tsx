export function Logo() {
  return (
    <div className="flex items-center gap-3">
      <div className="relative">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-emerald-700 shadow-lg">
          <svg
            className="h-6 w-6 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 5a2 2 0 012-2h2a2 2 0 012 2v2H8V5z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14"
            />
          </svg>
        </div>
        {/* Moroccan star accent */}
        <div className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-amber-500 shadow-sm"></div>
      </div>
      <div className="hidden sm:block">
        <h1 className="text-xl font-bold text-slate-900 dark:text-slate-100">Oujda Rentals</h1>
        <p className="text-xs text-slate-600 dark:text-slate-300">Location Voiture Maroc</p>
      </div>
    </div>
  );
}
