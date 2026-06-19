import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { CustomerShell } from "@/components/CustomerShell";
import { PageHeader, StatusChip } from "@/components/ui-bits";
import { orders, formatPrice } from "@/lib/mock";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/customer/orders")({ component: Orders });

const tabs = ["Active", "Delivered", "Cancelled"] as const;

function Orders() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Active");
  const filtered = orders.filter((o) =>
    tab === "Active" ? !["Delivered", "Rejected"].includes(o.status) :
    tab === "Delivered" ? o.status === "Delivered" :
    o.status === "Rejected"
  );

  return (
    <CustomerShell>
      <PageHeader title="My orders" back={false} />
      <div className="px-4 pt-3">
        <div className="flex rounded-full border bg-card p-1">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={"flex-1 rounded-full py-2 text-xs font-semibold transition " + (tab === t ? "bg-primary text-primary-foreground shadow-soft" : "text-muted-foreground")}
            >
              {t}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-3 p-4">
        {filtered.length === 0 ? (
          <div className="rounded-2xl border bg-card p-8 text-center text-sm text-muted-foreground">No orders here yet.</div>
        ) : filtered.map((o) => (
          <Link key={o.id} to="/customer/orders/$id" params={{ id: o.id }} className="block rounded-2xl border bg-card p-4 shadow-soft">
            <div className="flex items-start justify-between gap-2">
              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">#{o.id} · {o.placedAt}</p>
                <p className="mt-0.5 truncate text-sm font-semibold">{o.items.map((i) => i.name).join(", ")}</p>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </div>
            <div className="mt-3 flex items-center justify-between">
              <StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : o.status === "Pending" ? "warning" : "info"}>
                {o.status}
              </StatusChip>
              <span className="text-sm font-bold">{formatPrice(o.total)}</span>
            </div>
          </Link>
        ))}
      </div>
    </CustomerShell>
  );
}
