import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { CardForm } from "@/components/admin/CardForm";
import { getCardById, getCards, isCardSection } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section/$id")({
  loader: async ({ params }) => {
    if (!isCardSection(params.section)) throw notFound();
    const card = await getCardById(params.id);
    if (!card || card.section !== params.section) throw notFound();
    const existing = await getCards(params.section);
    return {
      card,
      nextSortOrder: existing.length ? Math.max(...existing.map((item) => item.sortOrder)) + 1 : 1,
    };
  },
  component: AdminEditCardPage,
});

function AdminEditCardPage() {
  const { section: sectionParam } = Route.useParams();
  const { card, nextSortOrder } = Route.useLoaderData();
  if (!isCardSection(sectionParam)) throw notFound();
  const section = sectionParam;

  return (
    <div>
      <p className="mb-2 text-sm text-muted-foreground">
        <Link to="/admin/$section" params={{ section }} className="hover:underline">
          Back to list
        </Link>
      </p>
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Edit card</h1>
      <CardForm section={section} card={card} nextSortOrder={nextSortOrder} />
    </div>
  );
}
