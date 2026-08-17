import { createFileRoute } from "@tanstack/react-router";

import { LegalDocument } from "@/components/site/LegalDocument";
import { legalPageHead } from "@/lib/cms-load";

export const Route = createFileRoute("/privacy-policy")({
  head: ({ matches }) => legalPageHead("privacy-policy", "/privacy-policy", matches),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return <LegalDocument page="privacy-policy" />;
}
