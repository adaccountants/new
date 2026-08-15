import { useReducedMotion } from "framer-motion";

export function Hero() {
  const reduced = useReducedMotion();

  return (
    <section className="w-full md:h-screen md:overflow-hidden">
      <video
        className="w-full h-auto block md:h-full md:w-full md:object-cover"
        autoPlay={!reduced}
        muted
        loop={!reduced}
        playsInline
        preload="auto"
      >
        <source src="/hero-video.mp4" type="video/mp4" />
      </video>
    </section>
  );
}
