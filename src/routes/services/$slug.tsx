import { Link, createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Phone } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import { getCardBySlug, isHomeServiceCard } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const card = getCardBySlug("services", params.slug);
    const title = card ? `${card.title} | Alpha Digi` : "Service | Alpha Digi";
    const description = card?.body || card?.subtitle || "";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServiceDetailPage,
});

function ServiceDetailPage() {
  useCms();
  const { slug } = Route.useParams();
  const card = getCardBySlug("services", slug);
  if (!card || !card.published || isHomeServiceCard(card)) {
    throw notFound();
  }

  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-10 pt-16 sm:pt-24">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground transition-colors hover:text-brand"
        >
          <ArrowLeft className="size-4" />
          {getContentValue("services.core.headingPrefix")}
          {getContentValue("services.core.headingBrand")}
        </Link>

        <span className="mt-8 inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
          {getContentValue("services.eyebrow")}
        </span>
        <h1 className="mt-6 max-w-3xl font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          {card.title}
        </h1>
        {card.subtitle ? (
          <p className="mt-4 max-w-2xl text-lg font-semibold text-foreground">{card.subtitle}</p>
        ) : null}
        {card.body ? (
          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">{card.body}</p>
        ) : null}

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-brand-foreground shadow-soft transition-all hover:bg-brand-strong hover:shadow-glow"
          >
            <Phone className="size-4" />
            {getContentValue("services.ctaPrimary")}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>

      {card.imageUrl ? (
        <section className="mx-auto max-w-6xl px-5 pb-16">
          <div className="overflow-hidden rounded-3xl border border-border bg-muted shadow-soft">
            <img
              src={card.imageUrl}
              alt={card.title}
              width={1200}
              height={720}
              className="aspect-video w-full object-cover"
            />
          </div>
        </section>
      ) : null}

      <ContactCta />
    </main>
  );
}
