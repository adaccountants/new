import { createFileRoute } from "@tanstack/react-router";

import { LegalDocument } from "@/components/site/LegalDocument";
import { legalPageHead } from "@/lib/cms-load";

export const Route = createFileRoute("/terms")({
  head: ({ matches }) => legalPageHead("terms", "/terms", matches),
  component: TermsPage,
});

function TermsPage() {
  return <LegalDocument page="terms" />;
}
