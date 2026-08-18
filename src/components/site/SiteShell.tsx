import type { ReactNode } from "react";
import { useRouterState } from "@tanstack/react-router";
import { CookieConsent } from "@/components/site/CookieConsent";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  if (pathname.startsWith("/admin")) {
    return <>{children}</>;
  }

  return (
    <div
      className="min-w-0 max-w-full bg-background text-foreground"
      style={{ minHeight: "100dvh" }}
    >
      <SiteHeader />
      {children}
      <SiteFooter />
      <CookieConsent />
    </div>
  );
}
