import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, MapPin, Search, ChevronRight, Plus, Star } from "lucide-react";
import { CustomerShell } from "@/components/CustomerShell";
import { StatusChip } from "@/components/ui-bits";
import { banners, categories, products, productImage, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/home")({ component: Home });

function Home() {
  const featured = products.slice(0, 6);
  return (
    <CustomerShell>
      <div className="bg-gradient-to-b from-primary-soft to-background px-5 pb-5 pt-5">
        <div className="flex items-center justify-between">
          <div className="min-w-0">
            <p className="flex items-center gap-1 text-[11px] font-medium uppercase tracking-wide text-primary">
              <MapPin className="h-3 w-3" /> Deliver to
            </p>
            <button className="mt-1 flex items-center gap-1 text-sm font-semibold">
              Home · Koramangala <ChevronRight className="h-4 w-4" />
            </button>
          </div>
          <Link to="/customer/notifications" className="relative grid h-10 w-10 place-items-center rounded-full bg-card shadow-soft">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </Link>
        </div>

        <Link
          to="/customer/search"
          className="mt-4 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-soft"
        >
          <Search className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Search for fruits, milk, bread…</span>
        </Link>
      </div>

      <section className="px-5">
        <div className="-mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 no-scrollbar">
          {banners.map((b) => (
            <div
              key={b.id}
              className="relative h-36 w-[280px] shrink-0 snap-start overflow-hidden rounded-3xl p-5 text-primary-foreground shadow-card"
              style={{ background: b.bg }}
            >
              <p className="text-xs font-medium uppercase tracking-wide opacity-90">{b.subtitle}</p>
              <h3 className="mt-1 text-2xl font-bold leading-tight">{b.title}</h3>
              <button className="mt-3 rounded-full bg-primary-foreground/90 px-3 py-1 text-xs font-semibold text-foreground">
                {b.cta}
              </button>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Categories</h2>
          <Link to="/customer/categories" className="text-xs font-medium text-primary">See all</Link>
        </div>
        <div className="mt-3 grid grid-cols-4 gap-3">
          {categories.slice(0, 8).map((c) => (
            <Link
              key={c.id}
              to="/customer/category/$id"
              params={{ id: c.id }}
              className="flex flex-col items-center gap-1.5"
            >
              <div
                className="grid h-16 w-16 place-items-center rounded-2xl text-2xl shadow-soft"
                style={{ background: c.color }}
              >
                {c.icon}
              </div>
              <span className="text-center text-[11px] font-medium leading-tight">{c.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="mt-6 px-5">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-semibold">Featured for you</h2>
          <StatusChip tone="info">Fresh today</StatusChip>
        </div>
        <div className="mt-3 grid grid-cols-2 gap-3">
          {featured.map((p) => (
            <Link
              key={p.id}
              to="/customer/product/$id"
              params={{ id: p.id }}
              className="group flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft transition active:scale-[0.98]"
            >
              <div className="relative aspect-square overflow-hidden bg-secondary">
                <img src={productImage(p)} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                {p.stock === 0 && (
                  <div className="absolute inset-0 grid place-items-center bg-background/70 text-xs font-semibold">Out of stock</div>
                )}
                <span className="absolute left-2 top-2 rounded-full bg-success px-2 py-0.5 text-[10px] font-semibold text-success-foreground">
                  {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% off
                </span>
              </div>
              <div className="flex flex-1 flex-col gap-1 p-3">
                <p className="line-clamp-2 text-[13px] font-medium leading-snug">{p.name}</p>
                <p className="text-[11px] text-muted-foreground">{p.unit}</p>
                <div className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                  <Star className="h-3 w-3 fill-warning text-warning" /> {p.rating}
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <div>
                    <span className="text-sm font-bold">{formatPrice(p.price)}</span>
                    <span className="ml-1 text-[11px] text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
                  </div>
                  <button className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </CustomerShell>
  );
}
