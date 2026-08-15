import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Testimonials } from "@/components/site/Testimonials";
import icaewLogo from "@/assets/finalicaewlogo.jpeg";

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
    links: [
      { rel: "preload", href: icaewLogo, as: "image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div id="top">
      <Hero />
      <About />
      <Services />
      <WhyChoose />
      <Testimonials />
    </div>
  );
}
