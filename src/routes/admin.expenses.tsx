import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { expenses, expenseCategories, rupees } from "@/lib/erp-mock";
import { Plus, Trash2, Edit3, Receipt } from "lucide-react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

export const Route = createFileRoute("/admin/expenses")({ component: Expenses });

function Expenses() {
  const [filter, setFilter] = useState<string>("All");
  const list = filter === "All" ? expenses : expenses.filter((e) => e.category === filter);
  const monthly = expenses.reduce((s, e) => s + e.amount, 0);

  const byCategory = expenseCategories.map((c, i) => ({
    name: c,
    value: expenses.filter((e) => e.category === c).reduce((s, e) => s + e.amount, 0),
    color: ["oklch(0.58 0.17 148)","oklch(0.78 0.16 75)","oklch(0.7 0.15 200)","oklch(0.72 0.14 320)","oklch(0.68 0.15 30)","oklch(0.6 0.12 250)","oklch(0.75 0.12 100)","oklch(0.65 0.1 20)"][i],
  })).filter((c) => c.value > 0);

  return (
    <AdminShell title="Expenses" action={
      <button className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Add expense</button>
    }>
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><Receipt className="h-5 w-5" /></div>
          <p className="mt-3 text-xl font-bold tracking-tight">{rupees(monthly)}</p>
          <p className="text-xs text-muted-foreground">Monthly expenses</p>
        </div>
        {byCategory.slice(0, 3).map((c) => (
          <div key={c.name} className="rounded-2xl border bg-card p-4 shadow-soft">
            <span className="inline-block h-3 w-3 rounded-full" style={{ background: c.color }} />
            <p className="mt-3 text-xl font-bold tracking-tight">{rupees(c.value)}</p>
            <p className="text-xs text-muted-foreground">{c.name}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-sm font-semibold">Recent expenses</h3>
            <select value={filter} onChange={(e) => setFilter(e.target.value)} className="rounded-xl border bg-card px-3 py-1.5 text-xs font-medium">
              <option>All</option>
              {expenseCategories.map((c) => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div className="-mx-5 mt-4 overflow-x-auto">
            <table className="w-full min-w-[640px] text-sm">
              <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                <tr className="border-b">
                  <th className="px-5 py-2">Date</th>
                  <th className="px-5 py-2">Category</th>
                  <th className="px-5 py-2">Description</th>
                  <th className="px-5 py-2">Paid via</th>
                  <th className="px-5 py-2 text-right">Amount</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {list.map((e) => (
                  <tr key={e.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3 text-xs">{e.date}</td>
                    <td className="px-5 py-3"><span className="rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium">{e.category}</span></td>
                    <td className="px-5 py-3 font-medium">{e.description}</td>
                    <td className="px-5 py-3 text-xs text-muted-foreground">{e.paidVia}</td>
                    <td className="px-5 py-3 text-right font-semibold">{rupees(e.amount)}</td>
                    <td className="px-5 py-3">
                      <div className="flex justify-end gap-1">
                        <button className="grid h-7 w-7 place-items-center rounded-lg border"><Edit3 className="h-3 w-3" /></button>
                        <button className="grid h-7 w-7 place-items-center rounded-lg border text-destructive"><Trash2 className="h-3 w-3" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Category breakdown</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {byCategory.map((c) => <Cell key={c.name} fill={c.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => rupees(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
