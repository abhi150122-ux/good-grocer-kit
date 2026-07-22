import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { customers } from "@/lib/mock";
import { suppliers, rupees } from "@/lib/erp-mock";
import { ArrowLeft, Download } from "lucide-react";

export const Route = createFileRoute("/admin/ledgers/$id")({
  loader: ({ params }) => {
    const c = customers.find((x) => x.id === params.id);
    const s = suppliers.find((x) => x.id === params.id);
    if (!c && !s) throw notFound();
    return { customer: c, supplier: s };
  },
  component: LedgerDetail,
  notFoundComponent: () => <AdminShell title="Not found"><p className="text-sm text-muted-foreground">This party does not exist.</p></AdminShell>,
  errorComponent: () => <AdminShell title="Error"><p className="text-sm text-destructive">Could not load ledger.</p></AdminShell>,
});

function LedgerDetail() {
  const { customer, supplier } = Route.useLoaderData();
  const name = customer?.name ?? supplier?.name ?? "";
  const isCustomer = !!customer;

  // Fake ledger entries with running balance
  const entries = isCustomer
    ? [
        { date: "01 Jul 2026", ref: "Opening balance", debit: 0, credit: 0 },
        { date: "05 Jul 2026", ref: "INV-2025-0028", debit: 1240, credit: 0 },
        { date: "08 Jul 2026", ref: "Receipt UPI", debit: 0, credit: 1000 },
        { date: "14 Jul 2026", ref: "INV-2025-0035", debit: 860, credit: 0 },
        { date: "20 Jul 2026", ref: "Receipt Cash", debit: 0, credit: 500 },
        { date: "22 Jul 2026", ref: "INV-2025-0042", debit: 865, credit: 865 },
      ]
    : [
        { date: "01 Jul 2026", ref: "Opening balance", debit: 0, credit: 0 },
        { date: "10 Jul 2026", ref: "PO-2025-0019", debit: 0, credit: 13860 },
        { date: "14 Jul 2026", ref: "Payment HDFC", debit: 10000, credit: 0 },
        { date: "20 Jul 2026", ref: "PO-2025-0021", debit: 0, credit: 8904 },
        { date: "22 Jul 2026", ref: "Payment HDFC", debit: 5000, credit: 0 },
      ];
  let bal = 0;
  const rows = entries.map((e) => { bal += e.debit - e.credit; return { ...e, balance: bal }; });

  return (
    <AdminShell title={name}>
      <div className="mb-4 flex items-center justify-between">
        <Link to="/admin/ledgers" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back to ledgers</Link>
        <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold"><Download className="h-3.5 w-3.5" /> Download statement</button>
      </div>

      <div className="rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="text-lg font-bold">{name}</p>
            <p className="text-xs text-muted-foreground">{isCustomer ? customer!.phone : supplier!.phone}</p>
            {supplier?.gstin && <p className="mt-0.5 font-mono text-[11px] text-muted-foreground">{supplier.gstin}</p>}
          </div>
          <div className="grid grid-cols-3 gap-3">
            <Card label={isCustomer ? "Total purchases" : "Total supplied"} value={rupees(isCustomer ? customer!.spent : supplier!.purchases)} />
            <Card label="Paid" value={rupees(isCustomer ? customer!.spent - Math.round(customer!.spent * 0.08) : supplier!.paid)} tone="text-success" />
            <Card label="Balance" value={rupees(Math.abs(bal))} tone={bal !== 0 ? "text-warning-foreground" : "text-muted-foreground"} />
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card shadow-soft">
        <div className="border-b p-5">
          <h3 className="text-sm font-semibold">Transaction history</h3>
          <p className="text-xs text-muted-foreground">Running balance in ledger view</p>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2">Date</th>
                <th className="px-5 py-2">Reference</th>
                <th className="px-5 py-2 text-right">Debit</th>
                <th className="px-5 py-2 text-right">Credit</th>
                <th className="px-5 py-2 text-right">Balance</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r, i) => (
                <tr key={i} className="border-b last:border-0">
                  <td className="px-5 py-3 text-xs">{r.date}</td>
                  <td className="px-5 py-3 font-medium">{r.ref}</td>
                  <td className="px-5 py-3 text-right">{r.debit ? rupees(r.debit) : "—"}</td>
                  <td className="px-5 py-3 text-right">{r.credit ? rupees(r.credit) : "—"}</td>
                  <td className={"px-5 py-3 text-right font-semibold " + (r.balance === 0 ? "text-muted-foreground" : r.balance > 0 ? "text-primary" : "text-warning-foreground")}>{rupees(Math.abs(r.balance))} {r.balance > 0 ? "Dr" : r.balance < 0 ? "Cr" : ""}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function Card({ label, value, tone = "" }: { label: string; value: string; tone?: string }) {
  return (
    <div className="rounded-xl border bg-secondary/30 p-3 text-right">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p className={"mt-1 text-base font-bold " + tone}>{value}</p>
    </div>
  );
}
