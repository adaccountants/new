import { createFileRoute } from "@tanstack/react-router";

import { CardForm } from "@/components/admin/CardForm";
import { getCards, isCardSection } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section/new")({
  loader: async ({ params }) => {
    if (!isCardSection(params.section)) return { nextSortOrder: 1 };
    const existing = await getCards(params.section);
    return {
      nextSortOrder: existing.length ? Math.max(...existing.map((card) => card.sortOrder)) + 1 : 1,
    };
  },
  component: AdminNewCardPage,
});

function AdminNewCardPage() {
  const { section: sectionParam } = Route.useParams();
  const { nextSortOrder } = Route.useLoaderData();
  if (!isCardSection(sectionParam)) return null;
  const section = sectionParam;

  return (
    <div>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Add card</h1>
      <CardForm section={section} nextSortOrder={nextSortOrder} />
    </div>
  );
}
