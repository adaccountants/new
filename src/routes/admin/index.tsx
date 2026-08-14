import { Link, createFileRoute } from "@tanstack/react-router";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CARD_SECTIONS, getCards } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getAllContentBlocks } from "@/lib/page-content-data";

export const Route = createFileRoute("/admin/")({
  component: AdminDashboardPage,
});

const sectionCopy: Record<string, string> = {
  services: "Services",
  testimonials: "Testimonials",
  blog: "Blog",
  knowledge: "Knowledge",
  team: "Team",
  careers: "Careers",
};

function AdminDashboardPage() {
  useCms();
  const contentCount = getAllContentBlocks().length;

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        In-memory CMS. Edits apply immediately on this session and reset on refresh.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARD_SECTIONS.map((section) => (
          <Link key={section} to="/admin/$section" params={{ section }}>
            <Card className="transition-colors hover:border-slate-400">
              <CardHeader>
                <CardDescription>{sectionCopy[section]}</CardDescription>
                <CardTitle className="text-3xl">{getCards(section).length}</CardTitle>
              </CardHeader>
            </Card>
          </Link>
        ))}
        <Link to="/admin/pages">
          <Card className="transition-colors hover:border-slate-400">
            <CardHeader>
              <CardDescription>Page content blocks</CardDescription>
              <CardTitle className="text-3xl">{contentCount}</CardTitle>
            </CardHeader>
          </Card>
        </Link>
      </div>
    </div>
  );
}
