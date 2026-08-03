import { MotionButton } from "@/components/motion/MotionButton";
import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { StaggerCards, type StaggerCardItem } from "@/components/motion/StaggerCards";
import interior from "@/assets/service-interior.jpg";
import custom from "@/assets/service-custom.jpg";
import commercial from "@/assets/service-commercial.jpg";
import outdoor from "@/assets/service-outdoor.jpg";

const projects: StaggerCardItem[] = [
  { id: "p1", label: "House Renovation", image: interior, caption: "Full refit with recycled materials" },
  { id: "p2", label: "Timber Frame Build", image: custom, caption: "Two-storey family home" },
  { id: "p3", label: "Corporate HQ", image: commercial, caption: "12,000 sq ft glass facade" },
  { id: "p4", label: "Garden Walkway", image: outdoor, caption: "Landscaped courtyard" },
];

export function Portfolio() {
  return (
    <section className="py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Our <span className="text-brand">Portfolio</span>
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">
          We have completed over 500+ projects across the USA.
        </p>
      </ScrollAnimate>

      <div className="mt-12">
        <StaggerCards items={projects} cardClassName="w-[260px] sm:w-[320px]" />
      </div>

      <ScrollAnimate delay={0.1} className="mt-4 flex justify-center">
        <MotionButton>See All Projects Now</MotionButton>
      </ScrollAnimate>
    </section>
  );
}
