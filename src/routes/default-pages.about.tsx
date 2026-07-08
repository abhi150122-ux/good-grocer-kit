import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section } from "@/components/PublicSite";
import { Store, Users, Heart, Leaf } from "lucide-react";

export const Route = createFileRoute("/default-pages/about")({
  head: () => ({
    meta: [
      { title: "About Us — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Learn about Sri Gopal Khadya Bhandaar, a trusted grocery store serving families across Ranchi with quality daily essentials." },
    ],
  }),
  component: About,
});

const values = [
  { icon: Heart, title: "Rooted in trust", desc: "A neighbourhood name families across Ranchi have relied on for their daily kitchen needs." },
  { icon: Leaf, title: "Fresh & authentic", desc: "Only trusted, well-known brands stocked in hygienic, well-managed conditions." },
  { icon: Users, title: "Customer first", desc: "Fair pricing, honest weights and friendly service on every single order." },
  { icon: Store, title: "Local business", desc: "Proudly operated from Ranchi, Jharkhand — supporting the local community every day." },
];

function About() {
  return (
    <PublicSite>
      <PageHero
        eyebrow="About us"
        title="A trusted name for daily essentials in Ranchi."
        subtitle="Sri Gopal Khadya Bhandaar is a family-run grocery store bringing quality atta, rice, dal, oil, ghee and masala to homes across Ranchi with reliable doorstep delivery."
      />

      <Section>
        <div className="grid gap-8 md:grid-cols-2">
          <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
            <h2 className="text-2xl font-bold tracking-tight">Our story</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Sri Gopal Khadya Bhandaar started with a simple idea — every family in Ranchi should be
              able to buy trusted kitchen essentials at fair prices, without leaving home. From atta and
              rice to ghee, oil and masala, we stock only the brands India loves and trusts.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Today we serve customers across Hatia, Hurdag, Kantatoli, Ashok Nagar and Mandar with
              doorstep delivery, honest weights and prices you can rely on.
            </p>
            <div className="mt-6 rounded-2xl bg-primary-soft p-4 text-primary">
              <p className="text-[11px] font-bold uppercase tracking-widest">Registered business</p>
              <p className="mt-1 text-sm font-semibold">GSTIN 20AFKFS5547K1ZP</p>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.title} className="rounded-2xl border bg-card p-5 shadow-soft">
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                  <v.icon className="h-5 w-5" />
                </div>
                <p className="mt-3 text-sm font-bold">{v.title}</p>
                <p className="mt-1 text-xs text-muted-foreground">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PublicSite>
  );
}
