import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Minus, Plus, Trash2, ShoppingCart, Tag } from "lucide-react";
import { CustomerShell } from "@/components/CustomerShell";
import { PageHeader, EmptyState } from "@/components/ui-bits";
import { products, productImage, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/cart")({ component: Cart });

function Cart() {
  const [items, setItems] = useState([
    { id: "p1", qty: 2 },
    { id: "p7", qty: 1 },
    { id: "p10", qty: 1 },
    { id: "p4", qty: 3 },
  ]);
  const data = items.map((i) => ({ ...i, p: products.find((p) => p.id === i.id)! }));
  const subtotal = data.reduce((s, x) => s + x.p.price * x.qty, 0);
  const delivery = subtotal > 499 ? 0 : 30;
  const total = subtotal + delivery;

  if (items.length === 0) {
    return (
      <CustomerShell>
        <PageHeader title="My cart" back={false} />
        <EmptyState
          icon={ShoppingCart}
          title="Your cart is empty"
          desc="Browse our fresh selection and add items to get started."
          action={<Link to="/customer/home" className="rounded-full bg-primary px-6 py-2.5 text-sm font-semibold text-primary-foreground">Start shopping</Link>}
        />
      </CustomerShell>
    );
  }

  return (
    <CustomerShell>
      <PageHeader title="My cart" subtitle={`${items.length} items`} back={false} />
      <div className="space-y-3 p-4">
        {data.map(({ p, qty }) => (
          <div key={p.id} className="flex gap-3 rounded-2xl border bg-card p-3 shadow-soft">
            <img src={productImage(p)} alt={p.name} className="h-20 w-20 rounded-xl object-cover" />
            <div className="flex min-w-0 flex-1 flex-col">
              <p className="line-clamp-2 text-sm font-medium">{p.name}</p>
              <p className="text-[11px] text-muted-foreground">{p.unit}</p>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-2 rounded-full border bg-secondary/50 p-1">
                  <button
                    onClick={() => qty === 1 ? setItems(items.filter((i) => i.id !== p.id)) : setItems(items.map((i) => i.id === p.id ? { ...i, qty: qty - 1 } : i))}
                    className="grid h-7 w-7 place-items-center rounded-full bg-card"
                  >
                    {qty === 1 ? <Trash2 className="h-3.5 w-3.5 text-destructive" /> : <Minus className="h-3.5 w-3.5" />}
                  </button>
                  <span className="min-w-5 text-center text-xs font-semibold">{qty}</span>
                  <button onClick={() => setItems(items.map((i) => i.id === p.id ? { ...i, qty: qty + 1 } : i))} className="grid h-7 w-7 place-items-center rounded-full bg-card">
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
                <span className="text-sm font-bold">{formatPrice(p.price * qty)}</span>
              </div>
            </div>
          </div>
        ))}

        <button className="flex w-full items-center gap-3 rounded-2xl border-2 border-dashed bg-card p-3.5 text-left">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-accent-foreground"><Tag className="h-4 w-4" /></div>
          <div className="flex-1">
            <p className="text-sm font-semibold">Apply coupon</p>
            <p className="text-[11px] text-muted-foreground">3 offers available</p>
          </div>
          <span className="text-xs font-semibold text-primary">View</span>
        </button>

        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Bill summary</p>
          <div className="mt-3 space-y-2 text-sm">
            <Row label="Subtotal" value={formatPrice(subtotal)} />
            <Row label="Delivery fee" value={delivery === 0 ? "FREE" : formatPrice(delivery)} accent={delivery === 0} />
            <Row label="Taxes" value="Included" />
            <div className="my-2 h-px bg-border" />
            <Row label="Total" value={formatPrice(total)} strong />
          </div>
        </div>
      </div>

      <div className="absolute bottom-[68px] left-1/2 z-10 w-full max-w-[440px] -translate-x-1/2 px-4">
        <Link
          to="/customer/checkout"
          className="grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-pop"
        >
          Checkout · {formatPrice(total)}
        </Link>
      </div>
    </CustomerShell>
  );
}

function Row({ label, value, strong, accent }: { label: string; value: string; strong?: boolean; accent?: boolean }) {
  return (
    <div className="flex justify-between">
      <span className={strong ? "font-semibold" : "text-muted-foreground"}>{label}</span>
      <span className={(strong ? "text-base font-bold " : "") + (accent ? "text-success font-semibold" : "")}>{value}</span>
    </div>
  );
}
