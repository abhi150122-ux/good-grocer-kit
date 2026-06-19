import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { Heart, Minus, Plus, Share2, ShoppingBag, Star, Truck, ShieldCheck } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader, StatusChip } from "@/components/ui-bits";
import { products, productImage, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/product/$id")({
  component: ProductPage,
  loader: ({ params }) => {
    const p = products.find((p) => p.id === params.id);
    if (!p) throw notFound();
    return p;
  },
});

function ProductPage() {
  const { id } = Route.useParams();
  const p = products.find((x) => x.id === id)!;
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState<"about" | "details">("about");
  const images = [p, ...products.filter((x) => x.category === p.category && x.id !== p.id).slice(0, 3)];

  return (
    <MobileFrame>
      <PageHeader title="Product" right={
        <div className="flex gap-1">
          <button className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><Share2 className="h-4 w-4" /></button>
          <button className="grid h-9 w-9 place-items-center rounded-full bg-secondary"><Heart className="h-4 w-4" /></button>
        </div>
      } />
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="bg-secondary/40">
          <div className="aspect-square">
            <img src={productImage(p)} alt={p.name} className="h-full w-full object-cover" />
          </div>
          <div className="flex gap-2 overflow-x-auto px-4 pb-4 no-scrollbar">
            {images.map((im, i) => (
              <div key={i} className={"h-16 w-16 shrink-0 overflow-hidden rounded-xl border-2 " + (i === 0 ? "border-primary" : "border-transparent")}>
                <img src={productImage(im)} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div className="px-5 pt-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-bold leading-tight">{p.name}</h1>
              <p className="mt-0.5 text-xs text-muted-foreground">{p.unit}</p>
            </div>
            {p.stock > 0 ? (
              <StatusChip tone="success">In stock</StatusChip>
            ) : (
              <StatusChip tone="danger">Out of stock</StatusChip>
            )}
          </div>

          <div className="mt-2 flex items-center gap-2">
            <span className="flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-xs font-semibold text-success">
              <Star className="h-3 w-3 fill-success" /> {p.rating}
            </span>
            <span className="text-xs text-muted-foreground">128 reviews</span>
          </div>

          <div className="mt-4 flex items-end gap-2">
            <span className="text-2xl font-bold">{formatPrice(p.price)}</span>
            <span className="text-sm text-muted-foreground line-through">{formatPrice(p.mrp)}</span>
            <span className="rounded-md bg-success/15 px-1.5 py-0.5 text-xs font-semibold text-success">
              {Math.round(((p.mrp - p.price) / p.mrp) * 100)}% off
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 rounded-2xl border bg-card p-3">
              <Truck className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] text-muted-foreground">Delivery</p>
                <p className="text-xs font-semibold">In 30 mins</p>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-2xl border bg-card p-3">
              <ShieldCheck className="h-4 w-4 text-primary" />
              <div>
                <p className="text-[11px] text-muted-foreground">Quality</p>
                <p className="text-xs font-semibold">Hand picked</p>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2 border-b">
            {(["about", "details"] as const).map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={"relative -mb-px border-b-2 px-3 py-2 text-sm font-medium capitalize " + (tab === t ? "border-primary text-primary" : "border-transparent text-muted-foreground")}
              >
                {t === "about" ? "About" : "Details"}
              </button>
            ))}
          </div>
          <div className="pt-4 text-sm leading-relaxed text-muted-foreground">
            {tab === "about" ? p.description : (
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between"><span className="text-muted-foreground">Pack size</span><span className="font-medium text-foreground">{p.unit}</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Storage</span><span className="font-medium text-foreground">Cool & dry place</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Shelf life</span><span className="font-medium text-foreground">5–7 days</span></li>
                <li className="flex justify-between"><span className="text-muted-foreground">Origin</span><span className="font-medium text-foreground">India</span></li>
              </ul>
            )}
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t bg-card/95 p-4 backdrop-blur md:rounded-b-[2.5rem]">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-3 rounded-full border bg-secondary/50 p-1">
            <button onClick={() => setQty(Math.max(1, qty - 1))} className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft"><Minus className="h-4 w-4" /></button>
            <span className="min-w-6 text-center text-sm font-semibold">{qty}</span>
            <button onClick={() => setQty(qty + 1)} className="grid h-9 w-9 place-items-center rounded-full bg-card shadow-soft"><Plus className="h-4 w-4" /></button>
          </div>
          <Link
            to="/customer/cart"
            className="flex flex-1 items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground shadow-card disabled:opacity-50"
          >
            <ShoppingBag className="h-4 w-4" />
            Add · {formatPrice(p.price * qty)}
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}
