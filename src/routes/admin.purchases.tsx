import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { purchases, suppliers, rupees, paymentStatusTone } from "@/lib/erp-mock";
import { Plus, Truck, IndianRupee, AlertCircle, Users } from "lucide-react";

export const Route = createFileRoute("/admin/purchases")({ component: Purchases });

function Purchases() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/admin/purchases") return <Outlet />;

  const totalPurchases = purchases.reduce((s, p) => s + p.total, 0);
  const outstanding = suppliers.reduce((s, x) => s + x.outstanding, 0);

  const cards = [
    { label: "Total purchases", value: rupees(totalPurchases), icon: Truck, tone: "bg-primary-soft text-primary" },
    { label: "Suppliers", value: suppliers.length.toString(), icon: Users, tone: "bg-chart-4/15 text-chart-4" },
    { label: "Amount paid", value: rupees(suppliers.reduce((s, x) => s + x.paid, 0)), icon: IndianRupee, tone: "bg-success/15 text-success" },
    { label: "Outstanding", value: rupees(outstanding), icon: AlertCircle, tone: "bg-warning/15 text-warning-foreground" },
  ];

  return (
    <AdminShell title="Purchases" action={
      <Link to="/admin/purchases/new" className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> New purchase</Link>
    }>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-4 shadow-soft">
            <div className={"grid h-10 w-10 place-items-center rounded-xl " + c.tone}><c.icon className="h-5 w-5" /></div>
            <p className="mt-3 text-xl font-bold tracking-tight">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold">Recent purchases</h3>
            <Link to="/admin/purchases/new" className="md:hidden inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" /> New</Link>
          </div>
          <div className="-mx-5 mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr className="border-b">
                  <th className="px-5 py-2">PO Number</th>
                  <th className="px-5 py-2">Supplier</th>
                  <th className="px-5 py-2">Date</th>
                  <th className="px-5 py-2">Status</th>
                  <th className="px-5 py-2 text-right">Amount</th>
                </tr>
              </thead>
              <tbody>
                {purchases.map((p) => (
                  <tr key={p.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3 font-semibold text-primary">{p.number}</td>
                    <td className="px-5 py-3 font-medium">{p.supplier}</td>
                    <td className="px-5 py-3 text-xs">{p.date}</td>
                    <td className="px-5 py-3"><StatusChip tone={paymentStatusTone(p.status)}>{p.status}</StatusChip></td>
                    <td className="px-5 py-3 text-right font-semibold">{rupees(p.total)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Top suppliers</h3>
          <p className="text-xs text-muted-foreground">By total purchases</p>
          <ul className="mt-4 space-y-3">
            {suppliers.map((s) => (
              <li key={s.id} className="rounded-xl border p-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium">{s.name}</p>
                  <span className="text-sm font-bold">{rupees(s.purchases)}</span>
                </div>
                <p className="mt-0.5 text-[11px] text-muted-foreground">{s.gstin}</p>
                {s.outstanding > 0 && (
                  <p className="mt-1 text-[11px] font-semibold text-warning-foreground">Outstanding {rupees(s.outstanding)}</p>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
