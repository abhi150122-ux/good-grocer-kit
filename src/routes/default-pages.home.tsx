import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicSite, Section, serviceAreas, productCatalog } from "@/components/PublicSite";
import { Truck, ShieldCheck, Clock, Sparkles, ArrowRight, MapPin } from "lucide-react";

export const Route = createFileRoute("/default-pages/home")({
  head: () => ({
    meta: [
      { title: "Sri Gopal Khadya Bhandaar — Grocery Delivery in Ranchi" },
      { name: "description", content: "Order atta, rice, dal, oil, ghee and daily essentials from Sri Gopal Khadya Bhandaar. Free delivery on orders above ₹149 across Ranchi." },
      { property: "og:title", content: "Sri Gopal Khadya Bhandaar — Ranchi Grocery Delivery" },
      { property: "og:description", content: "Fresh daily essentials delivered across Ranchi. Free delivery above ₹149." },
    ],
  }),
  component: HomePage,
});

const highlights = [
  { icon: Truck, title: "Free delivery over ₹149", desc: "No hidden charges — free doorstep delivery on qualifying orders." },
  { icon: Clock, title: "Same-day dispatch", desc: "Order before evening and receive the same day within service areas." },
  { icon: ShieldCheck, title: "Trusted brands", desc: "Aashirvaad, India Gate, Tata Sampann, Amul, Fortune and more." },
  { icon: Sparkles, title: "Fair everyday prices", desc: "Transparent MRP-based pricing on all pantry staples." },
];

function HomePage() {
  return (
    <PublicSite>
      <div className="border-b bg-gradient-to-br from-primary-soft via-background to-accent/40">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-14 md:grid-cols-2 md:py-20">
          <div>
            <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
              Ranchi · Jharkhand
            </p>
            <h1 className="mt-4 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
              Everyday groceries, delivered to your door.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted-foreground md:text-lg">
              Sri Gopal Khadya Bhandaar brings you trusted atta, rice, dal, oil, ghee and masala from
              India's most loved brands — with free delivery over ₹149.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link to="/default-pages/products" className="inline-flex items-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft">
                Browse products <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/default-pages/delivery" className="inline-flex items-center gap-2 rounded-full border bg-card px-5 py-3 text-sm font-semibold">
                Check delivery area
              </Link>
            </div>
            <p className="mt-4 text-[11px] text-muted-foreground">GSTIN 20AFKFS5547K1ZP</p>
          </div>
          <div className="relative">
            <div className="rounded-3xl border bg-card p-6 shadow-card">
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Today's picks</p>
              <ul className="mt-3 divide-y">
                {productCatalog[0].items.slice(0, 4).map((it) => (
                  <li key={it.name} className="flex items-center justify-between py-3">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-semibold">{it.name}</p>
                      <p className="text-xs text-muted-foreground">{it.variant}</p>
                    </div>
                    <span className="rounded-full bg-primary-soft px-2.5 py-1 text-xs font-bold text-primary">₹{it.price}</span>
                  </li>
                ))}
              </ul>
              <Link to="/default-pages/products" className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-primary">
                See full catalog <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <Section>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border bg-card p-5 shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <h.icon className="h-5 w-5" />
              </div>
              <p className="mt-3 text-sm font-bold">{h.title}</p>
              <p className="mt-1 text-xs text-muted-foreground">{h.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section className="!pt-0">
        <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
          <div className="flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Serving</p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">Delivery across Ranchi</h2>
            </div>
            <Link to="/default-pages/delivery" className="text-sm font-semibold text-primary">All pincodes →</Link>
          </div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((a) => (
              <div key={a.pin} className="flex items-start gap-3 rounded-2xl bg-secondary/50 p-4">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{a.area}</p>
                  <p className="text-xs text-muted-foreground">{a.city}, {a.state} · {a.pin}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>
    </PublicSite>
  );
}
