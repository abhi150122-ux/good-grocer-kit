import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { rupees, topSelling, invoices, monthlyProfit } from "@/lib/erp-mock";
import { salesData, customers, formatPrice } from "@/lib/mock";
import { IndianRupee, ShoppingBag, TrendingUp, Clock } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from "recharts";

export const Route = createFileRoute("/admin/sales")({ component: Sales });

function Sales() {
  const todaySales = 24100;
  const monthly = monthlyProfit[monthlyProfit.length - 1].revenue;
  const pending = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + (i.total - i.paid), 0);

  const cards = [
    { label: "Today's sales", value: rupees(todaySales), icon: IndianRupee, tone: "bg-primary-soft text-primary" },
    { label: "Monthly revenue", value: rupees(monthly), icon: TrendingUp, tone: "bg-chart-4/15 text-chart-4" },
    { label: "Orders (7d)", value: "184", icon: ShoppingBag, tone: "bg-success/15 text-success" },
    { label: "Pending collections", value: rupees(pending), icon: Clock, tone: "bg-warning/15 text-warning-foreground" },
  ];

  return (
    <AdminShell title="Sales">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-4 shadow-soft">
            <div className={"grid h-10 w-10 place-items-center rounded-xl " + c.tone}><c.icon className="h-5 w-5" /></div>
            <p className="mt-3 text-xl font-bold tracking-tight">{c.value}</p>
            <p className="text-xs text-muted-foreground">{c.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Daily sales — last 7 days</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatPrice(v)} contentStyle={{ borderRadius: 12 }} />
                <Bar dataKey="sales" fill="oklch(0.58 0.17 148)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Monthly revenue trend</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={monthlyProfit}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => formatPrice(v)} contentStyle={{ borderRadius: 12 }} />
                <Line type="monotone" dataKey="revenue" stroke="oklch(0.58 0.17 148)" strokeWidth={2.5} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="profit" stroke="oklch(0.78 0.16 75)" strokeWidth={2.5} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Top selling products</h3>
          <ul className="mt-4 space-y-3">
            {topSelling.map((p, i) => (
              <li key={p.name} className="flex items-center gap-3">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-xs font-bold text-primary">{i + 1}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.qty} sold</p>
                </div>
                <span className="text-sm font-semibold">{rupees(p.revenue)}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Customer-wise sales</h3>
          <ul className="mt-4 space-y-3">
            {customers.slice(0, 5).map((c) => (
              <li key={c.id} className="flex items-center justify-between rounded-xl border p-3">
                <div>
                  <p className="text-sm font-medium">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.orders} orders</p>
                </div>
                <span className="text-sm font-bold">{formatPrice(c.spent)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </AdminShell>
  );
}
