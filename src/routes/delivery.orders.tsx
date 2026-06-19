import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { DeliveryShell, DeliveryHeader } from "@/components/DeliveryShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, formatPrice } from "@/lib/mock";
import { ChevronRight, Power, MapPin, Package } from "lucide-react";

export const Route = createFileRoute("/delivery/orders")({ component: AssignedOrders });

function AssignedOrders() {
  const [online, setOnline] = useState(true);
  const active = orders.filter((o) => ["Accepted", "Packed", "Out for delivery"].includes(o.status));

  return (
    <DeliveryShell>
      <DeliveryHeader
        title="Ravi Kumar"
        subtitle="South zone"
        right={
          <button onClick={() => setOnline(!online)} className={"inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold " + (online ? "bg-success text-success-foreground" : "bg-primary-foreground/15")}>
            <Power className="h-3.5 w-3.5" /> {online ? "Online" : "Offline"}
          </button>
        }
      />

      <div className="-mt-4 px-4">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-card p-4 shadow-card text-center">
          <Stat n="3" label="Active" />
          <Stat n="12" label="Today" />
          <Stat n="₹240" label="Earnings" />
        </div>
      </div>

      <section className="px-4 pt-5">
        <h2 className="mb-3 text-sm font-semibold">Assigned orders</h2>
        {active.length === 0 ? (
          <div className="rounded-2xl border bg-card p-8 text-center">
            <Package className="mx-auto h-10 w-10 text-muted-foreground" />
            <p className="mt-3 text-sm font-semibold">No active orders</p>
            <p className="text-xs text-muted-foreground">New pickups will show up here.</p>
          </div>
        ) : (
          <ul className="space-y-3">
            {active.map((o) => (
              <li key={o.id}>
                <Link to="/delivery/order/$id" params={{ id: o.id }} className="block rounded-2xl border bg-card p-4 shadow-soft">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">#{o.id} · {o.placedAt}</p>
                      <p className="mt-0.5 truncate text-sm font-semibold">{o.customer}</p>
                      <p className="mt-1 flex items-center gap-1 text-[11px] text-muted-foreground">
                        <MapPin className="h-3 w-3" /> <span className="truncate">{o.address}</span>
                      </p>
                    </div>
                    <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground" />
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    <StatusChip tone={o.status === "Out for delivery" ? "info" : "warning"}>{o.status}</StatusChip>
                    <div className="text-right">
                      <p className="text-[11px] text-muted-foreground">{o.payment === "COD" ? "Collect cash" : "Prepaid"}</p>
                      <p className="text-sm font-bold">{formatPrice(o.total)}</p>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
    </DeliveryShell>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold">{n}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
