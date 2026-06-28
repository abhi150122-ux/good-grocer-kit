import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { OwnerShell, OwnerHeader } from "@/components/OwnerShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, formatPrice, type Order } from "@/lib/mock";
import { ChevronRight } from "lucide-react";

export const Route = createFileRoute("/owner/orders")({ component: OwnerOrders });

const tabs: ("All" | Order["status"])[] = ["All", "Pending", "Accepted", "Packed", "Out for delivery", "Delivered", "Rejected"];

function OwnerOrders() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/owner/orders") return <Outlet />;

  const [tab, setTab] = useState<(typeof tabs)[number]>("Pending");
  const list = tab === "All" ? orders : orders.filter((o) => o.status === tab);

  return (
    <OwnerShell>
      <OwnerHeader title="Orders" subtitle="Manage incoming" />
      <div className="px-4 py-4">
        <div className="-mx-1 mb-3 flex gap-2 overflow-x-auto px-1 pb-1 no-scrollbar">
          {tabs.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (tab === t ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
              {t}
            </button>
          ))}
        </div>

        <div className="space-y-2">
          {list.map((o) => (
            <Link key={o.id} to="/owner/orders/$id" params={{ id: o.id }} className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft">
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">#{o.id}</p>
                  <StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : o.status === "Pending" ? "warning" : "info"}>{o.status}</StatusChip>
                </div>
                <p className="mt-0.5 truncate text-[11px] text-muted-foreground">{o.customer} · {o.placedAt}</p>
                <div className="mt-2 flex items-center justify-between">
                  <span className="rounded-md bg-secondary px-2 py-0.5 text-[10px] font-semibold">{o.payment}</span>
                  <span className="text-sm font-bold">{formatPrice(o.total)}</span>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-muted-foreground" />
            </Link>
          ))}
          {list.length === 0 && (
            <p className="py-12 text-center text-sm text-muted-foreground">No orders in this category</p>
          )}
        </div>
      </div>
    </OwnerShell>
  );
}
