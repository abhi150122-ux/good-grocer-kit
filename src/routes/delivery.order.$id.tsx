import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader, StatusChip } from "@/components/ui-bits";
import { orders, formatPrice, type Order } from "@/lib/mock";
import { MapPin, Phone, Check, Package, Bike, Home, Navigation } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/delivery/order/$id")({
  component: DeliveryOrder,
  loader: ({ params }) => {
    const o = orders.find((o) => o.id === params.id) ?? orders[0];
    if (!o) throw notFound();
    return o;
  },
});

const flow: { key: Order["status"]; label: string; icon: typeof Check }[] = [
  { key: "Accepted", label: "Picked up", icon: Package },
  { key: "Packed", label: "Packed", icon: Package },
  { key: "Out for delivery", label: "On the way", icon: Bike },
  { key: "Delivered", label: "Delivered", icon: Home },
];

function DeliveryOrder() {
  const { id } = Route.useParams();
  const o = orders.find((x) => x.id === id) ?? orders[0];
  const [status, setStatus] = useState<Order["status"]>(o.status === "Pending" ? "Accepted" : o.status);
  const isDone = status === "Delivered";

  return (
    <MobileFrame>
      <PageHeader title={`#${o.id}`} subtitle={o.customer} back="/delivery/orders" />
      <main className="flex-1 overflow-y-auto pb-32">
        <div className="bg-gradient-to-b from-primary-soft to-background p-5">
          <StatusChip tone={isDone ? "success" : "info"}>{status}</StatusChip>
          <p className="mt-3 text-lg font-semibold">{isDone ? "Delivered" : "ETA · 12 minutes"}</p>
          <p className="text-xs text-muted-foreground">{o.address}</p>
        </div>

        <div className="px-5 pt-5">
          <div className="rounded-2xl border bg-card p-4 shadow-soft">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">{o.customer.split(" ").map(n => n[0]).join("")}</div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{o.customer}</p>
                <p className="text-[11px] text-muted-foreground">{o.phone}</p>
              </div>
              <a className="grid h-10 w-10 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-4 w-4" /></a>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border bg-card p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Items ({o.items.length})</p>
            <ul className="mt-3 space-y-2 text-sm">
              {o.items.map((i, idx) => (
                <li key={idx} className="flex justify-between">
                  <span>{i.qty} × {i.name}</span>
                  <span className="font-medium">{formatPrice(i.price * i.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">{o.payment === "COD" ? "Collect from customer" : "Prepaid via UPI"}</span>
              <span className="font-bold">{formatPrice(o.total)}</span>
            </div>
          </div>

          <div className="mt-4 rounded-2xl border bg-card p-4 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Update status</p>
            <ol className="mt-3 space-y-3">
              {flow.map((s, i) => {
                const idx = flow.findIndex((x) => x.key === status);
                const done = i <= idx;
                return (
                  <li key={s.key} className="flex items-center gap-3">
                    <div className={"grid h-9 w-9 shrink-0 place-items-center rounded-full " + (done ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground")}>
                      {done ? <Check className="h-4 w-4" /> : <s.icon className="h-4 w-4" />}
                    </div>
                    <p className={"flex-1 text-sm font-medium " + (done ? "" : "text-muted-foreground")}>{s.label}</p>
                    {!done && i === idx + 1 && (
                      <button onClick={() => { setStatus(s.key); toast.success(s.label); }} className="rounded-full bg-primary px-3 py-1.5 text-[11px] font-semibold text-primary-foreground">
                        Mark
                      </button>
                    )}
                  </li>
                );
              })}
            </ol>
          </div>
        </div>
      </main>

      <div className="absolute bottom-0 left-1/2 z-20 grid w-full max-w-[440px] -translate-x-1/2 grid-cols-2 gap-2 border-t bg-card/95 p-4 backdrop-blur md:rounded-b-[2.5rem]">
        <button className="inline-flex items-center justify-center gap-2 rounded-full border bg-card py-3 text-sm font-semibold"><Navigation className="h-4 w-4" /> Navigate</button>
        {isDone ? (
          <Link to="/delivery/orders" className="inline-flex items-center justify-center gap-2 rounded-full bg-success py-3 text-sm font-semibold text-success-foreground">
            <Check className="h-4 w-4" /> Done
          </Link>
        ) : (
          <Link to="/delivery/delivered/$id" params={{ id: o.id }} className="inline-flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
            <Check className="h-4 w-4" /> Mark delivered
          </Link>
        )}
      </div>
    </MobileFrame>
  );
}
