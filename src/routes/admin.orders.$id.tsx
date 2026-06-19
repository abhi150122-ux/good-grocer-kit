import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, partners, formatPrice, type Order } from "@/lib/mock";
import { Check, X, Bike, Phone, MapPin } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/orders/$id")({
  component: OrderDetails,
  loader: ({ params }) => {
    const o = orders.find((o) => o.id === params.id);
    if (!o) throw notFound();
    return o;
  },
});

const stages: Order["status"][] = ["Pending", "Accepted", "Packed", "Out for delivery", "Delivered"];

function OrderDetails() {
  const { id } = Route.useParams();
  const o = orders.find((o) => o.id === id)!;
  const [status, setStatus] = useState<Order["status"]>(o.status);
  const [assigned, setAssigned] = useState<string | undefined>(o.partner);

  return (
    <AdminShell title={`Order #${o.id}`}>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-xs text-muted-foreground">Placed {o.placedAt}</p>
                <h2 className="mt-1 text-lg font-semibold">{o.customer}</h2>
                <p className="text-xs text-muted-foreground">{o.phone}</p>
              </div>
              <StatusChip tone={status === "Delivered" ? "success" : status === "Rejected" ? "danger" : status === "Pending" ? "warning" : "info"}>{status}</StatusChip>
            </div>

            {status === "Pending" && (
              <div className="mt-4 flex gap-2">
                <button onClick={() => { setStatus("Accepted"); toast.success("Order accepted"); }} className="inline-flex items-center gap-2 rounded-xl bg-success px-4 py-2 text-sm font-semibold text-success-foreground"><Check className="h-4 w-4" /> Accept order</button>
                <button onClick={() => { setStatus("Rejected"); toast.error("Order rejected"); }} className="inline-flex items-center gap-2 rounded-xl border border-destructive/30 bg-card px-4 py-2 text-sm font-semibold text-destructive"><X className="h-4 w-4" /> Reject</button>
              </div>
            )}
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Update status</h3>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-5">
              {stages.map((s) => (
                <button key={s} onClick={() => { setStatus(s); toast.success(`Status: ${s}`); }} className={"rounded-xl border px-3 py-2 text-xs font-semibold " + (status === s ? "border-primary bg-primary-soft text-primary" : "bg-card")}>
                  {s}
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Items</h3>
            <ul className="mt-3 divide-y">
              {o.items.map((it, i) => (
                <li key={i} className="flex items-center justify-between py-3 text-sm">
                  <div>
                    <p className="font-medium">{it.name}</p>
                    <p className="text-[11px] text-muted-foreground">Qty {it.qty} · {formatPrice(it.price)} each</p>
                  </div>
                  <span className="font-semibold">{formatPrice(it.price * it.qty)}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex justify-between border-t pt-3 text-sm">
              <span className="font-semibold">Total</span>
              <span className="font-bold">{formatPrice(o.total)}</span>
            </div>
          </div>
        </div>

        <div className="space-y-5">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Delivery partner</h3>
            {assigned ? (
              <div className="mt-3 flex items-center gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-full bg-primary-soft text-primary"><Bike className="h-4 w-4" /></div>
                <div className="flex-1">
                  <p className="text-sm font-semibold">{assigned}</p>
                  <p className="text-[11px] text-muted-foreground">On the way</p>
                </div>
                <a className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Phone className="h-4 w-4" /></a>
              </div>
            ) : <p className="mt-2 text-xs text-muted-foreground">No partner assigned yet.</p>}

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Assign</p>
            <div className="mt-2 space-y-2">
              {partners.filter((p) => p.active).map((p) => (
                <button key={p.id} onClick={() => { setAssigned(p.name); toast.success(`Assigned to ${p.name}`); }} className={"flex w-full items-center gap-3 rounded-xl border p-3 text-left " + (assigned === p.name ? "border-primary bg-primary-soft" : "bg-card")}>
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-xs font-bold">{p.name.split(" ").map(n => n[0]).join("")}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{p.name}</p>
                    <p className="text-[11px] text-muted-foreground">{p.zone} zone · ★ {p.rating}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Delivery address</h3>
            <div className="mt-3 flex gap-3 text-sm">
              <MapPin className="h-4 w-4 shrink-0 text-primary" />
              <p>{o.address}</p>
            </div>
            <p className="mt-3 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Payment</p>
            <p className="mt-1 text-sm font-semibold">{o.payment === "COD" ? "Cash on delivery" : "Merchant UPI / QR"}</p>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
