import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "ada-cookie-consent-dismissed";

/**
 * Minimal notice for strictly necessary cookies only.
 * Upgrade this to a proper accept/reject consent mechanism (and block
 * scripts until consent) if analytics or tracking is ever added later —
 * those cookies must not load before consent is given.
 */
export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") {
        setVisible(true);
      }
    } catch {
      setVisible(true);
    }
  }, []);

  if (!visible) return null;

  function dismiss() {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {
      // Ignore quota / private-mode failures; the banner can reappear next visit.
    }
    setVisible(false);
  }

  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-0 z-40 p-4 sm:p-5">
      <div className="pointer-events-auto mx-auto flex max-w-6xl flex-col items-start gap-4 rounded-3xl border border-border bg-card p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm leading-relaxed text-muted-foreground">
          This website uses only strictly necessary cookies required for it to function. We do not
          use analytics or advertising cookies. See our{" "}
          <Link
            to="/cookie-policy"
            className="font-semibold text-brand transition-colors hover:text-brand-strong"
          >
            Cookie Policy
          </Link>
          .
        </p>
        <button
          type="button"
          onClick={dismiss}
          className="inline-flex h-9 shrink-0 items-center justify-center rounded-full bg-brand px-5 text-sm font-medium tracking-tight text-brand-foreground shadow-brand transition-colors hover:bg-brand-strong"
        >
          Got it
        </button>
      </div>
    </div>
  );
}
