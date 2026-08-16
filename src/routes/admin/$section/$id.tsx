import { useEffect, useState } from "react";
import { Link, createFileRoute, notFound } from "@tanstack/react-router";

import { CardForm } from "@/components/admin/CardForm";
import { getCardById, getCards, isCardSection, type Card } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section/$id")({
  loader: async ({ params }) => {
    if (!isCardSection(params.section)) throw notFound();
    return { id: params.id, section: params.section };
  },
  component: AdminEditCardPage,
});

function AdminEditCardPage() {
  const { section: sectionParam, id } = Route.useParams();
  const [card, setCard] = useState<Card | undefined>();
  const [nextSortOrder, setNextSortOrder] = useState(1);
  const [missing, setMissing] = useState(false);
  const section = isCardSection(sectionParam) ? sectionParam : null;

  useEffect(() => {
    if (!section) return;
    let cancelled = false;
    void Promise.all([getCardById(id), getCards(section)]).then(([loaded, existing]) => {
      if (cancelled) return;
      if (!loaded || loaded.section !== section) {
        setMissing(true);
        return;
      }
      setCard(loaded);
      setNextSortOrder(existing.length ? Math.max(...existing.map((item) => item.sortOrder)) + 1 : 1);
    });
    return () => {
      cancelled = true;
    };
  }, [id, section]);

  if (!section) throw notFound();
  if (missing) throw notFound();
  if (!card) return <p className="text-sm text-muted-foreground">Loading…</p>;

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
