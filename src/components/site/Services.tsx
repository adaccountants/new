import { ScrollAnimate } from "@/components/motion/ScrollAnimate";
import { StaggerCards, type StaggerCardItem } from "@/components/motion/StaggerCards";
import commercial from "@/assets/service-commercial.jpg";
import custom from "@/assets/service-custom.jpg";
import outdoor from "@/assets/service-outdoor.jpg";
import interior from "@/assets/service-interior.jpg";
import roofing from "@/assets/service-roofing.jpg";

const services: StaggerCardItem[] = [
  { id: "commercial", label: "Commercial Construction", image: commercial, caption: "Offices & retail" },
  { id: "custom", label: "Custom Building", image: custom, caption: "Homes from scratch" },
  { id: "outdoor", label: "Outdoor Design", image: outdoor, caption: "Gardens & patios" },
  { id: "interior", label: "Interior Remodeling", image: interior, caption: "Full refits" },
  { id: "roofing", label: "Roofing Services", image: roofing, caption: "Repair & install" },
];

export function Services() {
  return (
    <section id="services" className="py-20">
      <ScrollAnimate className="mx-auto max-w-2xl px-6 text-center">
        <h2 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">
          Our <span className="text-brand">Services</span>
        </h2>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          Our organization boasts a vibrant team of over 1,500 dedicated experts, each bringing
          unique talents and perspectives to deliver exceptional solutions tailored to our clients'
          diverse needs.
        </p>
      </ScrollAnimate>

      <div className="mt-12">
        <StaggerCards items={services} />
      </div>
    </section>
  );
}
