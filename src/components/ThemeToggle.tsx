"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";

type ThemeToggleProps = {
  showLabel?: boolean;
  fullWidth?: boolean;
  className?: string;
  onToggle?: () => void;
};

function SunIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M12 4V2m0 20v-2m8-8h2M2 12h2m14.36-6.36 1.42-1.42M4.22 19.78l1.42-1.42m12.72 0 1.42 1.42M4.22 4.22l1.42 1.42" />
      <circle cx="12" cy="12" r="4" strokeWidth={1.8} />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" aria-hidden="true">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={1.8}
        d="M21 14.2A8.5 8.5 0 0 1 9.8 3a7 7 0 1 0 11.2 11.2Z"
      />
    </svg>
  );
}

export function ThemeToggle({ showLabel = false, fullWidth = false, className = "", onToggle }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);
  const { resolvedTheme, theme, setTheme } = useTheme();
  const t = useTranslations();

  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 0);
    return () => window.clearTimeout(id);
  }, []);

  const activeTheme = (theme === "system" ? resolvedTheme : theme) ?? resolvedTheme ?? "light";
  const isDark = activeTheme === "dark";
  const nextTheme = isDark ? "light" : "dark";
  const label = mounted ? (isDark ? t("header.light") : t("header.dark")) : t("header.theme");

  return (
    <button
      type="button"
      onClick={() => {
        setTheme(nextTheme);
        onToggle?.();
      }}
      className={`inline-flex items-center gap-2 border border-slate-200 bg-white text-sm font-semibold text-slate-700 shadow-sm transition hover:border-emerald-300 hover:text-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:border-emerald-500 dark:hover:text-emerald-200 dark:focus:ring-offset-slate-950 ${
        fullWidth ? "w-full justify-start rounded-lg px-4 py-3" : showLabel ? "h-10 rounded-full px-3" : "h-10 w-10 justify-center rounded-full px-0"
      } ${className}`}
      aria-label={label}
      title={label}
    >
      <span className="inline-flex h-5 w-5 items-center justify-center">
        {mounted ? isDark ? <SunIcon /> : <MoonIcon /> : <span className="h-4 w-4 rounded-full bg-slate-300 dark:bg-slate-700" />}
      </span>
      {showLabel && <span className={fullWidth ? "" : "hidden sm:inline"}>{label}</span>}
    </button>
  );
}
