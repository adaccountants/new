import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/site/Hero";
import { About } from "@/components/site/About";
import { Services } from "@/components/site/Services";
import { WhyChoose } from "@/components/site/WhyChoose";
import { Testimonials } from "@/components/site/Testimonials";
import { pageSeoHead, rootCms } from "@/lib/cms-load";

export const Route = createFileRoute("/")({
  head: ({ matches }) => {
    const icaewImage = rootCms(matches).content["home.footer.icaewImageUrl"];
    return {
      meta: pageSeoHead("home", matches),
      links: icaewImage ? [{ rel: "preload" as const, href: icaewImage, as: "image" as const }] : [],
    };
  },
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
