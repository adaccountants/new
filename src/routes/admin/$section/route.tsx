import { Outlet, createFileRoute, notFound } from "@tanstack/react-router";

import { isCardSection } from "@/lib/cards-data";

export const Route = createFileRoute("/admin/$section")({
  beforeLoad: ({ params }) => {
    if (!isCardSection(params.section)) {
      throw notFound();
    }
  },
  component: () => <Outlet />,
});
