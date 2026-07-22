import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { accounts, cashTxns, rupees } from "@/lib/erp-mock";
import { Wallet, ArrowDownCircle, ArrowUpCircle, Banknote } from "lucide-react";

export const Route = createFileRoute("/admin/accounts")({ component: Accounts });

function Accounts() {
  const receipts = cashTxns.filter((t) => t.type === "Receipt").reduce((s, t) => s + t.amount, 0);
  const payments = cashTxns.filter((t) => t.type === "Payment").reduce((s, t) => s + t.amount, 0);
  const closing = accounts.reduce((s, a) => s + a.current, 0);
  const opening = accounts.reduce((s, a) => s + a.opening, 0);

  return (
    <AdminShell title="Accounts & Cash / Bank">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={Wallet} tone="bg-primary-soft text-primary" label="Total balance" value={rupees(closing)} />
        <StatCard icon={ArrowDownCircle} tone="bg-success/15 text-success" label="Total receipts" value={rupees(receipts)} />
        <StatCard icon={ArrowUpCircle} tone="bg-destructive/15 text-destructive" label="Total payments" value={rupees(payments)} />
        <StatCard icon={Banknote} tone="bg-chart-4/15 text-chart-4" label="Net cash flow" value={rupees(receipts - payments)} />
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        {accounts.map((a) => (
          <div key={a.id} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">{a.name}</p>
                <p className="text-[11px] text-muted-foreground">{a.type} account</p>
              </div>
              <StatusChip tone={a.current >= a.opening ? "success" : "warning"}>{a.current >= a.opening ? "↑" : "↓"} {Math.abs(a.current - a.opening) > 0 ? rupees(Math.abs(a.current - a.opening)) : "flat"}</StatusChip>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-secondary/40 p-3">
                <p className="text-[11px] text-muted-foreground">Opening balance</p>
                <p className="mt-1 font-bold">{rupees(a.opening)}</p>
              </div>
              <div className="rounded-xl bg-primary-soft p-3">
                <p className="text-[11px] text-muted-foreground">Current balance</p>
                <p className="mt-1 text-lg font-bold text-primary">{rupees(a.current)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold">Recent transactions</h3>
        <p className="text-xs text-muted-foreground">Cash, bank & UPI activity</p>
        <div className="-mx-5 mt-4 overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2">Date</th>
                <th className="px-5 py-2">Type</th>
                <th className="px-5 py-2">Account</th>
                <th className="px-5 py-2">Party</th>
                <th className="px-5 py-2">Note</th>
                <th className="px-5 py-2 text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {cashTxns.map((t) => (
                <tr key={t.id} className="border-b last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3 text-xs">{t.date}</td>
                  <td className="px-5 py-3"><StatusChip tone={t.type === "Receipt" ? "success" : "danger"}>{t.type}</StatusChip></td>
                  <td className="px-5 py-3 text-xs">{t.account}</td>
                  <td className="px-5 py-3 font-medium">{t.party}</td>
                  <td className="px-5 py-3 text-xs text-muted-foreground">{t.note}</td>
                  <td className={"px-5 py-3 text-right font-bold " + (t.type === "Receipt" ? "text-success" : "text-destructive")}>{t.type === "Receipt" ? "+" : "−"} {rupees(t.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}

function StatCard({ icon: Icon, tone, label, value }: { icon: any; tone: string; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-4 shadow-soft">
      <div className={"grid h-10 w-10 place-items-center rounded-xl " + tone}><Icon className="h-5 w-5" /></div>
      <p className="mt-3 text-xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label}</p>
    </div>
  );
}
