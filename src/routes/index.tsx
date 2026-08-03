import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/site/Hero";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Portfolio } from "@/components/site/Portfolio";
import { SiteFooter } from "@/components/site/SiteFooter";

const title = "C&A Construction — Building a Brighter Future";
const description =
  "C&A is a construction company delivering commercial builds, custom homes, interior remodeling, roofing and outdoor design across 4 countries.";

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
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <main>
        <Hero />
        <Services />
        <WhyChoose />
        <Portfolio />
      </main>
      <SiteFooter />
    </div>
  );
}
