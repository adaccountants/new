import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { ContactCta } from "@/components/site/ContactCta";
import blogMeeting from "@/assets/blog-meeting.jpg";
import blogSwitching from "@/assets/blog-switching.jpg";
import blogAi from "@/assets/blog-ai.jpg";
import blogLandlord from "@/assets/blog-landlord.jpg";
import blogLimitedCompany from "@/assets/blog-limited-company.jpg";
import blogRnd from "@/assets/blog-rnd.jpg";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Blog | Alpha Digi AI Accountants" },
      {
        name: "description",
        content:
          "Insights, guides and updates from Alpha Digi — practical advice from chartered accountants on tax, growth and digital accountancy.",
      },
      { property: "og:title", content: "Blog | Alpha Digi AI Accountants" },
      {
        property: "og:description",
        content:
          "Insights, guides and updates from Alpha Digi — practical advice from chartered accountants on tax, growth and digital accountancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preload", href: blogMeeting, as: "image" },
      { rel: "preload", href: blogSwitching, as: "image" },
      { rel: "preload", href: blogAi, as: "image" },
    ],
  }),
  component: BlogPage,
});

const posts = [
  {
    date: "March 12, 2026",
    title: "How often should you meet with your accountant?",
    summary:
      "We recommend meeting quarterly for general reviews and at least annually for tax planning and financial reporting. Here's why cadence matters.",
    img: blogMeeting,
  },
  {
    date: "February 24, 2026",
    title: "Switching accountants — what to expect",
    summary:
      "Switching is straightforward. We guide you through the whole process, liaising directly with your previous accountant for a seamless transition.",
    img: blogSwitching,
  },
  {
    date: "January 30, 2026",
    title: "AI in accountancy: what it actually changes",
    summary:
      "From anomaly detection in your ledger to real-time cash-flow forecasting — how AI-powered tools are reshaping practical accountancy.",
    img: blogAi,
  },
  {
    date: "January 8, 2026",
    title: "Landlord tax advice: minimising tax on rental income",
    summary:
      "Practical planning steps for property investors, from allowable expenses to structuring a portfolio for the long term.",
    img: blogLandlord,
  },
  {
    date: "December 12, 2025",
    title: "Starting a limited company — the right way",
    summary:
      "A step-by-step guide to incorporation, the tax basics, and the decisions to make in your first 90 days of trading.",
    img: blogLimitedCompany,
  },
  {
    date: "November 20, 2025",
    title: "R&D tax relief for software developers",
    summary:
      "What qualifies as R&D, how much you can claim, and the documentation you'll need before filing.",
    img: blogRnd,
  },
];

function BlogPage() {
  return (
    <main className="bg-background">
      <section className="mx-auto max-w-6xl px-5 pb-6 pt-16 sm:pt-24">
        <div className="max-w-3xl">
          <span className="inline-block rounded-full bg-brand/15 px-4 py-1.5 text-xs font-bold tracking-[0.2em] text-brand uppercase">
            Blog
          </span>
          <h1 className="mt-6 font-display text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Insights, guides and <span className="text-brand">updates</span>.
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Practical advice from our chartered accountants — on tax, growth, and the changing face
            of digital accountancy.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-20">
        <div className="grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <article
              key={post.title}
              className="group flex flex-col overflow-hidden rounded-3xl border border-border bg-card shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="relative h-52 overflow-hidden bg-muted">
                <img
                  src={post.img}
                  alt={post.title}
                  width={1024}
                  height={768}
                  loading={index < 6 ? "eager" : "lazy"}
                  decoding="async"
                  fetchPriority={index < 3 ? "high" : "low"}
                  className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-x-0 bottom-0 h-1.5 bg-brand" />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-6">
                <time className="text-xs font-bold tracking-wider text-brand uppercase">
                  {post.date}
                </time>
                <h2 className="text-lg leading-snug font-bold text-foreground">{post.title}</h2>
                <p className="text-sm leading-relaxed text-muted-foreground">{post.summary}</p>
                <Link
                  to="/contact"
                  className="mt-auto inline-flex w-fit items-center gap-2 pt-2 text-sm font-semibold text-brand transition-colors hover:underline"
                >
                  Read more
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  );
}
