import { useEffect, useState } from "react";
import { Link, createFileRoute } from "@tanstack/react-router";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { CARD_SECTIONS, getCards } from "@/lib/cards-data";
import { getAllContentBlocks } from "@/lib/page-content-data";

export const Route = createFileRoute("/admin/")({
  loader: async () => {
    const [blocks, ...sectionCounts] = await Promise.all([
      getAllContentBlocks(),
      ...CARD_SECTIONS.map(async (section) => ({
        section,
        count: (await getCards(section)).length,
      })),
    ]);
    return {
      contentCount: blocks.length,
      counts: Object.fromEntries(sectionCounts.map((item) => [item.section, item.count])),
    };
  },
  component: AdminDashboardPage,
});

const sectionCopy: Record<string, string> = {
  services: "Services",
  testimonials: "Testimonials",
  blog: "Blog",
  knowledge: "Knowledge",
  partnership: "Partnerships",
  team: "Team",
  careers: "Careers",
};

function AdminDashboardPage() {
  const loaded = Route.useLoaderData();
  const [contentCount, setContentCount] = useState(loaded.contentCount);
  const [counts, setCounts] = useState(loaded.counts);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      const [blocks, ...sectionCounts] = await Promise.all([
        getAllContentBlocks(),
        ...CARD_SECTIONS.map(async (section) => ({
          section,
          count: (await getCards(section)).length,
        })),
      ]);
      if (cancelled) return;
      setContentCount(blocks.length);
      setCounts(Object.fromEntries(sectionCounts.map((item) => [item.section, item.count])));
    })();
    return () => {
      cancelled = true;
    };
  }, [loaded.contentCount, loaded.counts]);

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-sm text-muted-foreground">Edit site content stored in Supabase.</p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CARD_SECTIONS.map((section) => (
          <Link key={section} to="/admin/$section" params={{ section }}>
            <Card className="transition-colors hover:border-slate-400">
              <CardHeader>
                <CardDescription>{sectionCopy[section]}</CardDescription>
                <CardTitle className="text-3xl">{counts[section] ?? 0}</CardTitle>
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
