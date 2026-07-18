import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Plus, Star, SlidersHorizontal, LayoutGrid } from "lucide-react";
import { CustomerShell } from "@/components/CustomerShell";
import { PageHeader } from "@/components/ui-bits";
import { categories, products, productImage, formatPrice, type Product } from "@/lib/mock";

export const Route = createFileRoute("/customer/category/$id")({
  component: Category,
  notFoundComponent: () => <div className="p-8 text-center text-sm">Category not found.</div>,
  loader: ({ params }) => {
    const c = categories.find((c) => c.id === params.id);
    if (!c) throw notFound();
    return c;
  },
});

const filters = ["Popular", "Price low → high", "Price high → low", "Top rated", "Discount"] as const;
type Filter = (typeof filters)[number];

function sortProducts(list: Product[], f: Filter): Product[] {
  const a = [...list];
  switch (f) {
    case "Price low → high": return a.sort((x, y) => x.price - y.price);
    case "Price high → low": return a.sort((x, y) => y.price - x.price);
    case "Top rated": return a.sort((x, y) => y.rating - x.rating);
    case "Discount": return a.sort((x, y) => (y.mrp - y.price) / y.mrp - (x.mrp - x.price) / x.mrp);
    default: return a;
  }
}

function Category() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const [filter, setFilter] = useState<Filter>("Popular");
  const [showAll, setShowAll] = useState(false);

  const cat = categories.find((c) => c.id === id)!;
  const others = categories.filter((c) => c.id !== id);
  const rail = [
    { id: "__all", name: "All", icon: "🛒", color: "oklch(0.94 0.03 150)", isAll: true },
    { id: cat.id, name: cat.name, icon: cat.icon, color: cat.color, isAll: false },
    ...others.map((c) => ({ ...c, isAll: false })),
  ];

  const list = useMemo(() => {
    const base = showAll ? products : products.filter((p) => p.category === id);
    return sortProducts(base, filter);
  }, [id, filter, showAll]);

  return (
    <CustomerShell>
      <PageHeader title={showAll ? "All products" : cat.name} subtitle={`${list.length} products`} />

      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto border-b bg-card/60 px-4 py-3 no-scrollbar">
        {filters.map((t) => {
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => setFilter(t)}
              className={
                "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium transition " +
                (active ? "border-primary bg-primary text-primary-foreground shadow-soft" : "bg-card")
              }
            >
              {t}
            </button>
          );
        })}
        <button className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-card">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      {/* Split: left rail + right products */}
      <div className="flex min-h-0 flex-1">
        <aside className="w-[92px] shrink-0 overflow-y-auto border-r bg-secondary/40 no-scrollbar">
          <ul className="flex flex-col">
            {rail.map((c) => {
              const active = c.isAll ? showAll : !showAll && c.id === id;
              const content = (
                <div
                  className={
                    "relative flex flex-col items-center gap-1.5 px-2 py-3 text-center transition " +
                    (active ? "bg-card" : "hover:bg-card/60")
                  }
                >
                  {active && <span className="absolute left-0 top-2 bottom-2 w-1 rounded-r-full bg-primary" />}
                  <div
                    className={
                      "grid h-12 w-12 place-items-center rounded-2xl text-2xl transition " +
                      (active ? "ring-2 ring-primary ring-offset-2 ring-offset-card" : "")
                    }
                    style={{ background: c.color }}
                  >
                    {c.icon}
                  </div>
                  <p className={"line-clamp-2 text-[10.5px] leading-tight " + (active ? "font-semibold text-primary" : "text-muted-foreground")}>
                    {c.name}
                  </p>
                </div>
              );
              if (c.isAll) {
                return (
                  <li key="__all">
                    <button className="w-full" onClick={() => setShowAll(true)}>{content}</button>
                  </li>
                );
              }
              return (
                <li key={c.id}>
                  <button
                    className="w-full"
                    onClick={() => {
                      setShowAll(false);
                      if (c.id !== id) navigate({ to: "/customer/category/$id", params: { id: c.id } });
                    }}
                  >
                    {content}
                  </button>
                </li>
              );
            })}
          </ul>
        </aside>

        <div className="min-w-0 flex-1 overflow-y-auto">
          {list.length === 0 ? (
            <div className="grid place-items-center p-10 text-center text-sm text-muted-foreground">
              <LayoutGrid className="mb-2 h-6 w-6" />
              No products here yet.
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3 p-3">
              {list.map((p) => (
                <Link
                  key={p.id}
                  to="/customer/product/$id"
                  params={{ id: p.id }}
                  className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft"
                >
                  <div className="relative aspect-square overflow-hidden bg-secondary">
                    <img src={productImage(p)} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
                    {p.stock === 0 && (
                      <div className="absolute inset-0 grid place-items-center bg-background/70 text-xs font-semibold">Out of stock</div>
                    )}
                    {p.stock > 0 && p.stock < 10 && (
                      <span className="absolute left-2 top-2 rounded-full bg-warning px-2 py-0.5 text-[10px] font-semibold text-warning-foreground">
                        Only {p.stock} left
                      </span>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-1 p-3">
                    <p className="line-clamp-2 text-[13px] font-medium">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.unit}</p>
                    <div className="flex items-center gap-1 text-[11px] text-muted-foreground">
                      <Star className="h-3 w-3 fill-warning text-warning" /> {p.rating}
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <div>
                        <span className="text-sm font-bold">{formatPrice(p.price)}</span>
                        <span className="ml-1 text-[11px] text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
                      </div>
                      <button className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground">
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </CustomerShell>
  );
}
