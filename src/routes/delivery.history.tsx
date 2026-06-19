import { createFileRoute } from "@tanstack/react-router";
import { DeliveryShell, DeliveryHeader } from "@/components/DeliveryShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/delivery/history")({ component: History });

function History() {
  const done = orders.filter((o) => ["Delivered", "Rejected"].includes(o.status));
  return (
    <DeliveryShell>
      <DeliveryHeader title="Delivery history" subtitle="Completed" />
      <div className="-mt-4 px-4">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-card p-4 shadow-card text-center">
          <Stat n="124" label="All time" />
          <Stat n="32" label="This week" />
          <Stat n="₹4.8k" label="Earnings" />
        </div>
      </div>

      <ul className="space-y-3 px-4 pt-5">
        {done.map((o) => (
          <li key={o.id} className="rounded-2xl border bg-card p-4 shadow-soft">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-xs text-muted-foreground">#{o.id} · {o.placedAt}</p>
                <p className="mt-0.5 text-sm font-semibold">{o.customer}</p>
                <p className="text-[11px] text-muted-foreground">{o.payment} · {formatPrice(o.total)}</p>
              </div>
              <StatusChip tone={o.status === "Delivered" ? "success" : "danger"}>{o.status}</StatusChip>
            </div>
          </li>
        ))}
      </ul>
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
