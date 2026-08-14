import { Link, createFileRoute } from "@tanstack/react-router";
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
import { useCms } from "@/lib/cms-sync";

export const Route = createFileRoute("/admin/$section/")({
  component: AdminSectionListPage,
});

const titles: Record<CardSection, string> = {
  services: "Services",
  testimonials: "Testimonials",
  blog: "Blog",
  knowledge: "Knowledge",
  team: "Team",
  careers: "Careers",
};

function AdminSectionListPage() {
  useCms();
  const { section: sectionParam } = Route.useParams();
  if (!isCardSection(sectionParam)) return null;
  const section = sectionParam;
  const cards = getCards(section);

  function move(id: string, direction: -1 | 1) {
    const ids = cards.map((card) => card.id);
    const index = ids.indexOf(id);
    const next = index + direction;
    const currentId = ids[index];
    const swapId = ids[next];
    if (index < 0 || next < 0 || next >= ids.length || !currentId || !swapId) return;
    ids[index] = swapId;
    ids[next] = currentId;
    reorderCards(section, ids);
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
          {cards.map((card, index) => (
            <li key={card.id} className="flex items-center gap-4 p-4">
              {card.imageUrl ? (
                <img
                  src={card.imageUrl}
                  alt=""
                  className="size-16 shrink-0 rounded-md object-cover"
                />
              ) : (
                <div className="grid size-16 shrink-0 place-items-center rounded-md bg-slate-100 text-xs text-muted-foreground">
                  No image
                </div>
              )}
              <div className="min-w-0 flex-1">
                <p className="truncate font-medium">{card.title}</p>
                <p className="truncate text-xs text-muted-foreground">
                  {card.slug ? `${card.slug} · ` : ""}sort {card.sortOrder}
                </p>
              </div>
              <Badge variant={card.published ? "default" : "secondary"}>
                {card.published ? "Published" : "Draft"}
              </Badge>
              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  size="icon"
                  variant="outline"
                  disabled={index === 0}
                  onClick={() => move(card.id, -1)}
                  aria-label="Move up"
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
                >
                  <ArrowDown className="size-4" />
                </Button>
                <Button asChild size="icon" variant="outline">
                  <Link to="/admin/$section/$id" params={{ section, id: card.id }}>
                    <Pencil className="size-4" />
                  </Link>
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="icon" variant="outline">
                      <Trash2 className="size-4" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete this card?</AlertDialogTitle>
                      <AlertDialogDescription>
                        “{card.title}” will be removed from this session’s mock data. This cannot be
                        undone until you refresh the page.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={() => deleteCard(card.id)}>Delete</AlertDialogAction>
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
