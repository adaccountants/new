import { createFileRoute } from "@tanstack/react-router";

import { CardForm } from "@/components/admin/CardForm";
import { getCards, isCardSection } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section/new")({
  component: AdminNewCardPage,
});

function AdminNewCardPage() {
  const { section: sectionParam } = Route.useParams();
  if (!isCardSection(sectionParam)) return null;
  const section = sectionParam;
  const existing = getCards(section);
  const nextSortOrder = existing.length ? Math.max(...existing.map((card) => card.sortOrder)) + 1 : 1;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Add card</h1>
      <CardForm section={section} nextSortOrder={nextSortOrder} />
    </div>
  );
}
