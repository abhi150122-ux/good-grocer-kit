import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader, StatusChip } from "@/components/ui-bits";
import { orders, formatPrice } from "@/lib/mock";
import { Check, MapPin, Phone, Bike, Package, ShoppingBag, Home } from "lucide-react";

export const Route = createFileRoute("/customer/orders/$id")({
  component: OrderDetails,
  loader: ({ params }) => {
    const o = orders.find((o) => o.id === params.id) ?? orders[0];
    if (!o) throw notFound();
    return o;
  },
});

const stages = [
  { key: "Pending", label: "Order placed", icon: ShoppingBag },
  { key: "Accepted", label: "Confirmed", icon: Check },
  { key: "Packed", label: "Packed", icon: Package },
  { key: "Out for delivery", label: "Out for delivery", icon: Bike },
  { key: "Delivered", label: "Delivered", icon: Home },
] as const;

function OrderDetails() {
  const { id } = Route.useParams();
  const o = orders.find((x) => x.id === id) ?? orders[0];
  const currentIdx = stages.findIndex((s) => s.key === o.status);
  const activeIdx = currentIdx === -1 ? 0 : currentIdx;

  return (
    <MobileFrame>
      <PageHeader title={`#${o.id}`} subtitle={o.placedAt} />
      <main className="flex-1 overflow-y-auto pb-6">
        <div className="bg-primary-soft px-5 py-5">
          <StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : "info"}>
            {o.status}
          </StatusChip>
          <p className="mt-3 text-lg font-semibold">Arriving in about 22 minutes</p>
          <p className="text-xs text-muted-foreground">We'll notify you on WhatsApp.</p>
        </div>

        <div className="p-5">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <ol className="relative space-y-5">
              {stages.map((s, i) => {
                const done = i <= activeIdx;
                return (
                  <li key={s.key} className="flex items-start gap-3">
                    <div className="relative">
                      <div className={"grid h-9 w-9 place-items-center rounded-full " + (done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                        <s.icon className="h-4 w-4" />
                      </div>
                      {i < stages.length - 1 && (
                        <div className={"absolute left-1/2 top-full h-5 w-0.5 -translate-x-1/2 " + (i < activeIdx ? "bg-primary" : "bg-border")} />
                      )}
                    </div>
                    <div className="pt-1.5">
                      <p className={"text-sm font-semibold " + (done ? "" : "text-muted-foreground")}>{s.label}</p>
                      {i === activeIdx && <p className="text-[11px] text-primary">In progress</p>}
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          {o.partner && (
            <div className="mt-4 flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-primary"><Bike className="h-5 w-5" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{o.partner}</p>
                <p className="text-[11px] text-muted-foreground">Your delivery partner</p>
              </div>
              <a href="tel:" className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-4 w-4" /></a>
            </div>
          )}

          <div className="mt-4 rounded-2xl border bg-card p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Items</p>
            <ul className="mt-3 space-y-2 text-sm">
              {o.items.map((i, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{i.qty} × {i.name}</span>
                  <span className="font-semibold">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-semibold">{o.payment}</span></div>
            <div className="mt-1 flex justify-between text-sm"><span className="text-muted-foreground">Total</span><span className="font-bold">{formatPrice(o.total)}</span></div>
          </div>

          <div className="mt-4 flex gap-3 rounded-2xl border bg-card p-4 shadow-soft">
            <MapPin className="h-4 w-4 shrink-0 text-primary" />
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Delivering to</p>
              <p className="mt-1 text-sm">{o.address}</p>
            </div>
          </div>

          <Link to="/customer/orders" className="mt-6 grid h-11 w-full place-items-center rounded-full border bg-card text-sm font-semibold">
            Back to orders
          </Link>
        </div>
      </main>
    </MobileFrame>
  );
}
