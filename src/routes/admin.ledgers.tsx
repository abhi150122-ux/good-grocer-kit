import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { customers } from "@/lib/mock";
import { suppliers, rupees } from "@/lib/erp-mock";
import { ChevronRight, Users, Truck } from "lucide-react";

export const Route = createFileRoute("/admin/ledgers")({ component: Ledgers });

function Ledgers() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/admin/ledgers") return <Outlet />;
  const [tab, setTab] = useState<"customer" | "supplier">("customer");

  return (
    <AdminShell title="Ledgers">
      <div className="mb-5 inline-flex rounded-xl border bg-card p-1">
        <button onClick={() => setTab("customer")} className={"inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold " + (tab === "customer" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
          <Users className="h-4 w-4" /> Customer ledger
        </button>
        <button onClick={() => setTab("supplier")} className={"inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold " + (tab === "supplier" ? "bg-primary text-primary-foreground" : "text-muted-foreground")}>
          <Truck className="h-4 w-4" /> Supplier ledger
        </button>
      </div>

      {tab === "customer" ? (
        <div className="rounded-2xl border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr className="border-b">
                  <th className="px-5 py-3">Customer</th>
                  <th className="px-5 py-3 text-right">Orders</th>
                  <th className="px-5 py-3 text-right">Total purchase</th>
                  <th className="px-5 py-3 text-right">Paid</th>
                  <th className="px-5 py-3 text-right">Pending</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {customers.map((c) => {
                  const pending = Math.round(c.spent * 0.1) * ((c.id.charCodeAt(1) % 3) === 0 ? 1 : 0);
                  const paid = c.spent - pending;
                  return (
                    <tr key={c.id} className="border-b last:border-0 hover:bg-secondary/30">
                      <td className="px-5 py-3">
                        <p className="font-medium">{c.name}</p>
                        <p className="text-[11px] text-muted-foreground">{c.phone}</p>
                      </td>
                      <td className="px-5 py-3 text-right">{c.orders}</td>
                      <td className="px-5 py-3 text-right font-semibold">{rupees(c.spent)}</td>
                      <td className="px-5 py-3 text-right text-success">{rupees(paid)}</td>
                      <td className={"px-5 py-3 text-right font-semibold " + (pending > 0 ? "text-warning-foreground" : "text-muted-foreground")}>{rupees(pending)}</td>
                      <td className="px-5 py-3"><Link to="/admin/ledgers/$id" params={{ id: c.id }} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">View <ChevronRight className="h-3 w-3" /></Link></td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="rounded-2xl border bg-card shadow-soft">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr className="border-b">
                  <th className="px-5 py-3">Supplier</th>
                  <th className="px-5 py-3">GSTIN</th>
                  <th className="px-5 py-3 text-right">Purchases</th>
                  <th className="px-5 py-3 text-right">Paid</th>
                  <th className="px-5 py-3 text-right">Outstanding</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {suppliers.map((s) => (
                  <tr key={s.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3"><p className="font-medium">{s.name}</p><p className="text-[11px] text-muted-foreground">{s.phone}</p></td>
                    <td className="px-5 py-3 font-mono text-xs">{s.gstin}</td>
                    <td className="px-5 py-3 text-right font-semibold">{rupees(s.purchases)}</td>
                    <td className="px-5 py-3 text-right text-success">{rupees(s.paid)}</td>
                    <td className={"px-5 py-3 text-right font-semibold " + (s.outstanding > 0 ? "text-warning-foreground" : "text-muted-foreground")}>{rupees(s.outstanding)}</td>
                    <td className="px-5 py-3"><Link to="/admin/ledgers/$id" params={{ id: s.id }} className="inline-flex items-center gap-1 text-xs font-semibold text-primary">View <ChevronRight className="h-3 w-3" /></Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
