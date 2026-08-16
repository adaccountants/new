import { Link } from "@tanstack/react-router";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { StaggerCards } from "@/components/motion/StaggerCards";
import { getCards, isHomeServiceCard } from "@/lib/cards-data";
import { useCms } from "@/lib/cms-sync";
import { getContentValue } from "@/lib/page-content-data";

export function Services() {
  useCms();
  const eyebrow = getContentValue("home.services.eyebrow");
  const headingPrefix = getContentValue("home.services.headingPrefix");
  const headingBrand = getContentValue("home.services.headingBrand");
  const headingSuffix = getContentValue("home.services.headingSuffix");
  const intro = getContentValue("home.services.intro");
  const cta = getContentValue("home.services.cta");
  const services = getCards("services")
    .filter((card) => card.published && isHomeServiceCard(card))
    .map((card) => {
      const item: { id: string; label: string; image: string; caption?: string } = {
        id: card.id,
        label: card.title,
        image: card.imageUrl,
      };
      if (card.subtitle) item.caption = card.subtitle;
      return item;
    });

  return (
    <section id="services" className="py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold tracking-[0.2em] text-brand uppercase">{eyebrow}</p>
        <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          {headingPrefix}
          <span className="text-brand">{headingBrand}</span>
          {headingSuffix}
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{intro}</p>
        <Link
          to="/services"
          className="mt-6 inline-flex items-center justify-center rounded-full bg-brand px-6 py-2.5 text-sm font-medium text-brand-foreground shadow-brand hover:bg-brand-strong"
        >
          {cta}
        </Link>
      </ScrollAnimate>

      <div className="mt-12">
        <StaggerCards items={services} />
      </div>
    </section>
  );
}
