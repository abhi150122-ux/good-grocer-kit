import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBasket, LayoutDashboard, Bike, ArrowRight, Leaf } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "FreshCart — Grocery Delivery" },
      { name: "description", content: "Mobile-first grocery ecommerce with Customer app, Admin panel and Delivery partner system." },
    ],
  }),
  component: Landing,
});

const roles = [
  {
    to: "/customer/splash",
    icon: ShoppingBasket,
    title: "Customer App",
    desc: "Browse groceries, order in minutes and track delivery — mobile-first shopping experience.",
    tag: "Mobile",
  },
  {
    to: "/admin",
    icon: LayoutDashboard,
    title: "Admin & Vendor",
    desc: "Manage products, orders, customers and delivery partners with a full dashboard.",
    tag: "Dashboard",
  },
  {
    to: "/delivery",
    icon: Bike,
    title: "Delivery Partner",
    desc: "Pick up assigned orders, update status and review delivery history on the go.",
    tag: "On-route",
  },
] as const;

function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-soft via-background to-accent/40">
      <div className="mx-auto max-w-6xl px-5 py-10 md:py-20">
        <div className="flex items-center gap-2">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
            <Leaf className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight">FreshCart</span>
        </div>

        <header className="mt-12 max-w-3xl">
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary-soft px-3 py-1 text-xs font-medium text-primary">
            Frontend design system • Mobile-first
          </p>
          <h1 className="mt-5 text-4xl font-bold leading-tight tracking-tight md:text-6xl">
            A complete grocery commerce experience.
          </h1>
          <p className="mt-4 max-w-2xl text-base text-muted-foreground md:text-lg">
            Three role-based UIs in one cohesive design system — Customer mobile app, Admin & Vendor
            panel and a lightweight Delivery Partner system.
          </p>
        </header>

        <div className="mt-10 grid gap-5 md:mt-14 md:grid-cols-3">
          {roles.map((r) => (
            <Link
              key={r.to}
              to={r.to}
              className="group relative overflow-hidden rounded-3xl border bg-card p-6 shadow-card transition hover:-translate-y-1 hover:shadow-pop"
            >
              <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary-soft transition group-hover:scale-125" />
              <div className="relative">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground shadow-soft">
                  <r.icon className="h-6 w-6" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <h3 className="text-xl font-semibold tracking-tight">{r.title}</h3>
                  <span className="rounded-full bg-secondary px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
                    {r.tag}
                  </span>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{r.desc}</p>
                <span className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  Open <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        <p className="mt-12 text-center text-xs text-muted-foreground">
          Static mock data • No backend • Built for client presentation
        </p>
      </div>
    </div>
  );
}
