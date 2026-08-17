import { useEffect, useState } from "react";
import { Link, createFileRoute, useRouter } from "@tanstack/react-router";
import { ArrowDown, ArrowUp, Pencil, Plus, Trash2 } from "lucide-react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { deleteCard, getCards, isCardSection, reorderCards, type CardSection } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section/")({
  loader: async ({ params }) => {
    if (!isCardSection(params.section)) return { cards: [] };
    return { cards: await getCards(params.section) };
  },
  component: AdminSectionListPage,
});

const titles: Record<CardSection, string> = {
  services: "Services",
  testimonials: "Testimonials",
  blog: "Blog",
  knowledge: "Knowledge",
  partnership: "Partnerships",
  team: "Team",
  careers: "Careers",
};

function AdminSectionListPage() {
  const router = useRouter();
  const { section: sectionParam } = Route.useParams();
  const { cards: loadedCards } = Route.useLoaderData();
  const [cards, setCards] = useState(loadedCards);
  const section = isCardSection(sectionParam) ? sectionParam : null;

  useEffect(() => {
    if (!section) return;
    setCards(loadedCards);
    void getCards(section).then(setCards);
  }, [section, loadedCards]);

  if (!section) return null;

  function move(id: string, direction: -1 | 1) {
    const ids = cards.map((card) => card.id);
    const index = ids.indexOf(id);
    const next = index + direction;
    const currentId = ids[index];
    const swapId = ids[next];
    if (index < 0 || next < 0 || next >= ids.length || !currentId || !swapId) return;
    ids[index] = swapId;
    ids[next] = currentId;
    void reorderCards(section, ids).then(() => router.invalidate());
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{titles[section]}</h1>
          <p className="mt-1 text-sm text-muted-foreground">{cards.length} cards</p>
        </div>
        <Button asChild>
          <Link to="/admin/$section/new" params={{ section }}>
            <Plus className="size-4" />
            Add card
          </Link>
        </Button>
      </div>

      {cards.length === 0 ? (
        <p className="mt-10 text-sm text-muted-foreground">
          No cards in this section yet. About currently has no named team members on the live site,
          so Team starts empty — add people here when you have photos and bios.
        </p>
      ) : (
        <ul className="mt-8 divide-y rounded-xl border bg-white">
          {cards.map((card, index) => (            <li key={card.id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-4">
              {/* Thumbnail */}
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt=""
                  className={`size-16 shrink-0 rounded-md ${
                    section === "partnership"
                      ? "bg-slate-50 object-contain p-1"
                      : "object-cover"
                  }`}
                />
              ) : (
                <div className="grid size-16 shrink-0 place-items-center rounded-md bg-slate-100 text-xs text-muted-foreground">
                  No image
                </div>
              )}

              {/* Title + badge row */}
              <div className="flex min-w-0 flex-1 items-center gap-3 sm:contents">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">{card.title}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {card.slug ? `${card.slug} · ` : ""}sort {card.sortOrder}
                  </p>
                </div>
                <Badge variant={card.published ? "default" : "secondary"}>
                  {card.published ? "Published" : "Draft"}
                </Badge>
              </div>

              {/* Action buttons — full row on mobile, inline on sm+ */}
              <div className="flex items-center gap-2">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => move(card.id, -1)}
                  aria-label="Move up"
                  className="h-11 w-11 sm:h-9 sm:w-9"
                >
                  <ArrowUp className="size-4" />
                </Button>
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === cards.length - 1}
                  onClick={() => move(card.id, 1)}
                  aria-label="Move down"
                  className="h-11 w-11 sm:h-9 sm:w-9"
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button asChild size="icon" variant="outline" className="h-11 w-11 sm:h-9 sm:w-9">
                  <Link to="/admin/$section/$id" params={{ section, id: card.id }}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="outline" className="h-11 w-11 sm:h-9 sm:w-9">
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this card?</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{card.title}" will be permanently deleted.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          void deleteCard(card.id).then(() => router.invalidate());
                        }}
                      >
                        Delete
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
