import { createFileRoute, notFound, useRouter } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader, StatusChip } from "@/components/ui-bits";
import { orders, partners, formatPrice, type Order } from "@/lib/mock";
import { Check, X, Bike, Phone, MapPin, Package } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/owner/orders/$id")({
  component: OwnerOrderDetail,
  loader: ({ params }) => {
    const o = orders.find((o) => o.id === params.id);
    if (!o) throw notFound();
    return o;
  },
});

const stages: Order["status"][] = ["Accepted", "Packed", "Out for delivery", "Delivered"];

function OwnerOrderDetail() {
  const { id } = Route.useParams();
  const router = useRouter();
  const o = orders.find((o) => o.id === id)!;
  const [status, setStatus] = useState<Order["status"]>(o.status);
  const [assigned, setAssigned] = useState<string | undefined>(o.partner);
  const [showAssign, setShowAssign] = useState(false);

  return (
    <MobileFrame>
      <PageHeader title={`Order #${o.id}`} subtitle={o.placedAt} />
      <div className="space-y-3 p-4 pb-32">
        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-base font-semibold">{o.customer}</p>
              <p className="text-xs text-muted-foreground">{o.phone}</p>
            </div>
            <StatusChip tone={status === "Delivered" ? "success" : status === "Rejected" ? "danger" : status === "Pending" ? "warning" : "info"}>{status}</StatusChip>
          </div>
          <a href={`tel:${o.phone}`} className="mt-3 inline-flex items-center gap-2 rounded-full bg-primary-soft px-3 py-1.5 text-xs font-semibold text-primary">
            <Phone className="h-3.5 w-3.5" /> Call customer
          </a>
        </div>

        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold"><Package className="h-4 w-4 text-primary" /> Items ({o.items.length})</div>
          <ul className="mt-3 divide-y">
            {o.items.map((it, i) => (
              <li key={i} className="flex items-center justify-between py-2.5 text-sm">
                <div>
                  <p className="font-medium">{it.name}</p>
                  <p className="text-[11px] text-muted-foreground">Qty {it.qty} · {formatPrice(it.price)}</p>
                </div>
                <span className="font-semibold">{formatPrice(it.price * it.qty)}</span>
              </li>
            ))}
          </ul>
          <div className="mt-3 flex justify-between border-t pt-3 text-sm">
            <span className="font-semibold">Total ({o.payment})</span>
            <span className="text-base font-bold">{formatPrice(o.total)}</span>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-2 text-sm font-semibold"><MapPin className="h-4 w-4 text-primary" /> Delivery address</div>
          <p className="mt-2 text-sm">{o.address}</p>
        </div>

        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <p className="text-sm font-semibold">Delivery partner</p>
          {assigned ? (
            <div className="mt-3 flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Bike className="h-4 w-4" /></div>
              <div className="flex-1">
                <p className="text-sm font-semibold">{assigned}</p>
                <p className="text-[11px] text-muted-foreground">Assigned</p>
              </div>
              <button onClick={() => setShowAssign(true)} className="rounded-full border px-3 py-1.5 text-xs font-semibold">Change</button>
            </div>
          ) : (
            <button onClick={() => setShowAssign(true)} className="mt-3 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">
              <Bike className="h-4 w-4" /> Assign delivery partner
            </button>
          )}
        </div>

        {status !== "Pending" && status !== "Rejected" && (
          <div className="rounded-2xl border bg-card p-4 shadow-soft">
            <p className="text-sm font-semibold">Update status</p>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {stages.map((s) => (
                <button key={s} onClick={() => { setStatus(s); toast.success(`Marked as ${s}`); }} className={"rounded-xl border px-3 py-2 text-xs font-semibold " + (status === s ? "border-primary bg-primary-soft text-primary" : "bg-card")}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {status === "Pending" && (
        <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t bg-card/95 px-4 py-3 backdrop-blur md:rounded-b-[2.5rem]">
          <div className="flex gap-2">
            <button
              onClick={() => { setStatus("Rejected"); toast.error("Order rejected"); }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-destructive/30 bg-card px-4 py-3 text-sm font-semibold text-destructive">
              <X className="h-4 w-4" /> Reject
            </button>
            <button
              onClick={() => { setStatus("Accepted"); toast.success("Order accepted"); }}
              className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-success px-4 py-3 text-sm font-semibold text-success-foreground shadow-soft">
              <Check className="h-4 w-4" /> Accept
            </button>
          </div>
        </div>
      )}

      {showAssign && (
        <div className="absolute inset-0 z-30 flex items-end bg-foreground/40 md:rounded-[2.5rem]" onClick={() => setShowAssign(false)}>
          <div className="w-full rounded-t-3xl bg-card p-5" onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-muted" />
            <p className="text-base font-semibold">Assign delivery partner</p>
            <p className="text-xs text-muted-foreground">Available now in your zones</p>
            <div className="mt-4 space-y-2 max-h-[50vh] overflow-y-auto">
              {partners.filter((p) => p.active).map((p) => (
                <button
                  key={p.id}
                  onClick={() => { setAssigned(p.name); setShowAssign(false); toast.success(`Assigned to ${p.name}`); }}
                  className={"flex w-full items-center gap-3 rounded-xl border p-3 text-left " + (assigned === p.name ? "border-primary bg-primary-soft" : "bg-card")}>
                  <div className="grid h-10 w-10 place-items-center rounded-full bg-secondary text-xs font-bold">{p.name.split(" ").map(n => n[0]).join("")}</div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.zone} zone · ★ {p.rating} · {p.deliveries} deliveries</p>
                  </div>
                  <span className="h-2 w-2 rounded-full bg-success" />
                </button>
              ))}
            </div>
            <button onClick={() => setShowAssign(false)} className="mt-4 w-full rounded-xl border bg-card py-2.5 text-sm font-semibold">Cancel</button>
          </div>
        </div>
      )}
    </MobileFrame>
  );
}
