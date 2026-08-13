import { createFileRoute } from "@tanstack/react-router";
import { SiteShell } from "@/components/site/SiteShell";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Testimonials } from "@/components/site/Testimonials";

const title = "Alpha Digi AI — Chartered Accountants in London";
const description =
  "ICAEW chartered accountants for individuals and business owners: annual accounts, tax planning, business start up, payroll, VAT and cloud bookkeeping.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <div id="top">
        <Hero />
        <About />
        <Services />
        <WhyChoose />
        <Testimonials />
      </div>
    </SiteShell>
  );
}
