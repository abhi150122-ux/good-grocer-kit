import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, salesData, formatPrice, customers } from "@/lib/mock";
import { invoices, inventory, expenses, monthlyProfit, topSelling, rupees } from "@/lib/erp-mock";
import { ShoppingBag, Users, IndianRupee, TrendingUp, ArrowUpRight, ArrowRight, Boxes, Wallet, Receipt, AlertTriangle, Clock, PiggyBank } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid, BarChart, Bar, PieChart, Pie, Cell, Legend } from "recharts";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

function Dashboard() {
  const totalRevenue = monthlyProfit.reduce((s, m) => s + m.revenue, 0);
  const monthly = monthlyProfit[monthlyProfit.length - 1];
  const invValue = inventory.reduce((s, i) => s + i.stock * i.purchasePrice, 0);
  const lowStock = inventory.filter((i) => i.stock < i.minStock).length;
  const pending = invoices.filter((i) => i.status !== "Paid").reduce((s, i) => s + (i.total - i.paid), 0);
  const monthExp = expenses.reduce((s, e) => s + e.amount, 0);

  const stats = [
    { label: "Total revenue", value: rupees(totalRevenue), icon: IndianRupee, change: "+12.4%", tone: "bg-primary-soft text-primary" },
    { label: "Total orders", value: "1,284", icon: ShoppingBag, change: "+8.1%", tone: "bg-chart-4/15 text-chart-4" },
    { label: "Customers", value: customers.length.toString() + "0", icon: Users, change: "+5.1%", tone: "bg-success/15 text-success" },
    { label: "Products", value: inventory.length.toString(), icon: Boxes, change: "+2", tone: "bg-warning/15 text-warning-foreground" },
    { label: "Inventory value", value: rupees(invValue), icon: PiggyBank, change: "+3.4%", tone: "bg-primary-soft text-primary" },
    { label: "Monthly profit", value: rupees(monthly.profit), icon: TrendingUp, change: "+6.8%", tone: "bg-success/15 text-success" },
    { label: "Monthly expenses", value: rupees(monthExp), icon: Receipt, change: "+2.1%", tone: "bg-destructive/15 text-destructive" },
    { label: "Outstanding", value: rupees(pending), icon: Clock, change: "3 overdue", tone: "bg-warning/15 text-warning-foreground" },
  ];

  const expenseBreakdown = [
    { name: "Rent", value: 35000, color: "oklch(0.58 0.17 148)" },
    { name: "Salaries", value: 18000, color: "oklch(0.78 0.16 75)" },
    { name: "Electricity", value: 4820, color: "oklch(0.7 0.15 200)" },
    { name: "Other", value: 8610, color: "oklch(0.72 0.14 320)" },
  ];

  return (
    <AdminShell title="Dashboard">
      {lowStock > 0 && (
        <Link to="/admin/inventory" className="mb-5 flex items-center justify-between rounded-2xl border border-warning/40 bg-warning/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning/20 text-warning-foreground"><AlertTriangle className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">{lowStock} products need restocking</p>
              <p className="text-[11px] text-muted-foreground">Review inventory to avoid stock-outs</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>
      )}

      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-soft md:p-5">
            <div className="flex items-start justify-between">
              <div className={"grid h-10 w-10 place-items-center rounded-xl " + s.tone}>
                <s.icon className="h-5 w-5" />
              </div>
              <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                <ArrowUpRight className="h-3 w-3" /> {s.change}
              </span>
            </div>
            <p className="mt-3 text-xl font-bold tracking-tight md:text-2xl">{s.value}</p>
            <p className="text-xs text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Sales & revenue trend</h3>
              <p className="text-xs text-muted-foreground">Last 7 days</p>
            </div>
            <select className="rounded-xl border bg-card px-3 py-1.5 text-xs font-medium">
              <option>7 days</option><option>30 days</option><option>90 days</option>
            </select>
          </div>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={salesData}>
                <defs>
                  <linearGradient id="g" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="oklch(0.58 0.17 148)" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="oklch(0.58 0.17 148)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12 }} />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.58 0.17 148)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Expense breakdown</h3>
          <p className="text-xs text-muted-foreground">This month</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={expenseBreakdown} dataKey="value" innerRadius={45} outerRadius={70} paddingAngle={3}>
                  {expenseBreakdown.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Tooltip formatter={(v: number) => rupees(v)} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <h3 className="text-sm font-semibold">Monthly profit analysis</h3>
          <div className="mt-4 h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyProfit}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip formatter={(v: number) => rupees(v)} contentStyle={{ borderRadius: 12 }} />
                <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="revenue" fill="oklch(0.58 0.17 148)" radius={[6,6,0,0]} />
                <Bar dataKey="expenses" fill="oklch(0.78 0.16 75)" radius={[6,6,0,0]} />
                <Bar dataKey="profit" fill="oklch(0.7 0.15 200)" radius={[6,6,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

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
                <span className="text-xs font-semibold">{rupees(p.revenue)}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-semibold">Recent orders</h3>
            <p className="text-xs text-muted-foreground">Latest 6 orders</p>
          </div>
          <Link to="/admin/orders" className="inline-flex items-center gap-1 text-xs font-semibold text-primary">View all <ArrowRight className="h-3 w-3" /></Link>
        </div>
        <div className="-mx-5 mt-4 overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2 font-semibold">Order</th>
                <th className="px-5 py-2 font-semibold">Customer</th>
                <th className="px-5 py-2 font-semibold">Payment</th>
                <th className="px-5 py-2 font-semibold">Status</th>
                <th className="px-5 py-2 text-right font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {orders.slice(0, 6).map((o) => (
                <tr key={o.id} className="border-b last:border-0 hover:bg-secondary/30">
                  <td className="px-5 py-3"><Link to="/admin/orders/$id" params={{ id: o.id }} className="font-semibold text-primary">#{o.id}</Link></td>
                  <td className="px-5 py-3"><p className="font-medium">{o.customer}</p><p className="text-[11px] text-muted-foreground">{o.placedAt}</p></td>
                  <td className="px-5 py-3"><span className="rounded-md bg-secondary px-2 py-0.5 text-[11px] font-semibold">{o.payment}</span></td>
                  <td className="px-5 py-3"><StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : o.status === "Pending" ? "warning" : "info"}>{o.status}</StatusChip></td>
                  <td className="px-5 py-3 text-right font-semibold">{formatPrice(o.total)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
