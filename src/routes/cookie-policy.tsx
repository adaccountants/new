import { createFileRoute } from "@tanstack/react-router";

import { LegalDocument } from "@/components/site/LegalDocument";
import { legalPageHead } from "@/lib/cms-load";

export const Route = createFileRoute("/cookie-policy")({
  head: ({ matches }) => legalPageHead("cookie-policy", "/cookie-policy", matches),
  component: CookiePolicyPage,
});

function CookiePolicyPage() {
  return <LegalDocument page="cookie-policy" />;
}
