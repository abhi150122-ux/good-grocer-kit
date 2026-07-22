import { createFileRoute, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { invoices, rupees, paymentStatusTone, type InvoiceType } from "@/lib/erp-mock";
import { FileText, Plus, Download, Printer, Share2, Search, IndianRupee, AlertCircle, Clock } from "lucide-react";

export const Route = createFileRoute("/admin/billing")({ component: Billing });

const types: (InvoiceType | "All")[] = ["All", "GST Invoice", "Non-GST Invoice", "Quotation", "Proforma", "Delivery Challan", "Purchase Order"];

function Billing() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  if (path !== "/admin/billing") return <Outlet />;
  const [tab, setTab] = useState<(typeof types)[number]>("All");
  const [q, setQ] = useState("");

  const list = invoices.filter((i) => (tab === "All" || i.type === tab) && (q === "" || i.number.toLowerCase().includes(q.toLowerCase()) || i.customer.toLowerCase().includes(q.toLowerCase())));
  const today = invoices.filter((i) => i.date === "22 Jul 2026");
  const totalAmt = invoices.reduce((s, i) => s + i.total, 0);
  const pending = invoices.filter((i) => i.status === "Unpaid" || i.status === "Partial").reduce((s, i) => s + (i.total - i.paid), 0);
  const overdue = invoices.filter((i) => i.status === "Overdue").reduce((s, i) => s + (i.total - i.paid), 0);

  const cards = [
    { label: "Today's invoices", value: today.length.toString(), icon: FileText, tone: "bg-primary-soft text-primary" },
    { label: "Total invoiced", value: rupees(totalAmt), icon: IndianRupee, tone: "bg-chart-4/15 text-chart-4" },
    { label: "Pending payments", value: rupees(pending), icon: Clock, tone: "bg-warning/15 text-warning-foreground" },
    { label: "Overdue", value: rupees(overdue), icon: AlertCircle, tone: "bg-destructive/15 text-destructive" },
  ];

  return (
    <AdminShell title="Billing & Invoicing" action={
      <Link to="/admin/billing/new" className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
        <Plus className="h-4 w-4" /> New invoice
      </Link>
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

      <div className="mt-5 rounded-2xl border bg-card p-4 shadow-soft md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2 rounded-xl border bg-secondary/40 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search invoice or customer…" className="w-56 bg-transparent text-sm outline-none" />
          </div>
          <Link to="/admin/billing/new" className="md:hidden inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground">
            <Plus className="h-4 w-4" /> New invoice
          </Link>
        </div>
        <div className="mt-3 -mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
          {types.map((t) => (
            <button key={t} onClick={() => setTab(t)} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (tab === t ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
              {t}
            </button>
          ))}
        </div>

        <div className="-mx-4 mt-4 overflow-x-auto md:-mx-5">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2 font-semibold">Invoice</th>
                <th className="px-5 py-2 font-semibold">Type</th>
                <th className="px-5 py-2 font-semibold">Customer</th>
                <th className="px-5 py-2 font-semibold">Date</th>
                <th className="px-5 py-2 font-semibold">Status</th>
                <th className="px-5 py-2 text-right font-semibold">Total</th>
                <th className="px-5 py-2 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => (
                <tr key={i.id} className="border-b last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3"><Link to="/admin/billing/$id" params={{ id: i.id }} className="font-semibold text-primary">{i.number}</Link></td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{i.type}</td>
                  <td className="px-5 py-3"><p className="font-medium">{i.customer}</p><p className="text-[11px] text-muted-foreground">{i.phone}</p></td>
                  <td className="px-5 py-3 text-xs">{i.date}</td>
                  <td className="px-5 py-3"><StatusChip tone={paymentStatusTone(i.status)}>{i.status}</StatusChip></td>
                  <td className="px-5 py-3 text-right font-semibold">{rupees(i.total)}</td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-1.5">
                      <button className="grid h-8 w-8 place-items-center rounded-lg border bg-card" title="Download"><Download className="h-3.5 w-3.5" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg border bg-card" title="Print"><Printer className="h-3.5 w-3.5" /></button>
                      <button className="grid h-8 w-8 place-items-center rounded-lg border bg-success/10 text-success" title="WhatsApp"><Share2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
              {list.length === 0 && (
                <tr><td colSpan={7} className="py-10 text-center text-sm text-muted-foreground">No invoices match your filter</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
