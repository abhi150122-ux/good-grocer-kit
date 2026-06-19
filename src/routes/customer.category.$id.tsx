import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Plus, Star, SlidersHorizontal } from "lucide-react";
import { CustomerShell } from "@/components/CustomerShell";
import { PageHeader } from "@/components/ui-bits";
import { categories, products, productImage, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/category/$id")({
  component: Category,
  notFoundComponent: () => <div className="p-8 text-center text-sm">Category not found.</div>,
  loader: ({ params }) => {
    const c = categories.find((c) => c.id === params.id);
    if (!c) throw notFound();
    return c;
  },
});

function Category() {
  const { id } = Route.useParams();
  const cat = categories.find((c) => c.id === id)!;
  const list = products.filter((p) => p.category === id);
  return (
    <CustomerShell>
      <PageHeader title={cat.name} subtitle={`${list.length} products`} />
      <div className="flex items-center gap-2 overflow-x-auto px-4 py-3 no-scrollbar">
        {["Popular", "Price low → high", "Price high → low", "Top rated", "Discount"].map((t, i) => (
          <button
            key={t}
            className={
              "shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " +
              (i === 0 ? "border-primary bg-primary text-primary-foreground" : "bg-card")
            }
          >
            {t}
          </button>
        ))}
        <button className="ml-auto grid h-9 w-9 shrink-0 place-items-center rounded-full border bg-card">
          <SlidersHorizontal className="h-4 w-4" />
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {list.map((p) => (
          <Link
            key={p.id}
            to="/customer/product/$id"
            params={{ id: p.id }}
            className="flex flex-col overflow-hidden rounded-2xl border bg-card shadow-soft"
          >
            <div className="relative aspect-square overflow-hidden bg-secondary">
              <img src={productImage(p)} alt={p.name} className="h-full w-full object-cover" loading="lazy" />
              {p.stock === 0 && <div className="absolute inset-0 grid place-items-center bg-background/70 text-xs font-semibold">Out of stock</div>}
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
                <button className="grid h-8 w-8 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="h-4 w-4" /></button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </CustomerShell>
  );
}
