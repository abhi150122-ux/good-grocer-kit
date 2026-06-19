import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, formatPrice, type Order } from "@/lib/mock";
import { Search, Filter, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin/orders")({ component: AdminOrders });

const tabs: ("All" | Order["status"])[] = ["All", "Pending", "Accepted", "Packed", "Out for delivery", "Delivered", "Rejected"];

function AdminOrders() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("All");
  const list = tab === "All" ? orders : orders.filter((o) => o.status === tab);

  return (
    <AdminShell title="Orders">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search by order ID, customer…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <button className="inline-flex items-center gap-2 rounded-xl border bg-card px-3 py-2 text-sm font-semibold">
          <Filter className="h-4 w-4" /> Filter
        </button>
      </div>

      <div className="mb-4 flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {tabs.map((t) => (
          <button key={t} onClick={() => setTab(t)} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (tab === t ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
            {t}
          </button>
        ))}
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm">
            <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Order</th>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Items</th>
                <th className="px-5 py-3 font-semibold">Payment</th>
                <th className="px-5 py-3 font-semibold">Status</th>
                <th className="px-5 py-3 text-right font-semibold">Total</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {list.map((o) => (
                <tr key={o.id} className="border-t hover:bg-secondary/30">
                  <td className="px-5 py-3">
                    <p className="font-semibold text-primary">#{o.id}</p>
                    <p className="text-[11px] text-muted-foreground">{o.placedAt}</p>
                  </td>
                  <td className="px-5 py-3">
                    <p className="font-medium">{o.customer}</p>
                    <p className="text-[11px] text-muted-foreground">{o.phone}</p>
                  </td>
                  <td className="px-5 py-3">{o.items.length}</td>
                  <td className="px-5 py-3"><span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold">{o.payment}</span></td>
                  <td className="px-5 py-3"><StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : o.status === "Pending" ? "warning" : "info"}>{o.status}</StatusChip></td>
                  <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                  <td className="px-5 py-3 text-right">
                    <Link to="/admin/orders/$id" params={{ id: o.id }} className="grid h-8 w-8 place-items-center rounded-lg border bg-card"><ChevronRight className="h-4 w-4" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
