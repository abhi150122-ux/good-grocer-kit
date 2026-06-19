import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, salesData, formatPrice, customers } from "@/lib/mock";
import { ShoppingBag, Users, IndianRupee, TrendingUp, ArrowUpRight, ArrowRight } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, AreaChart, Area, CartesianGrid } from "recharts";

export const Route = createFileRoute("/admin/")({ component: Dashboard });

const stats = [
  { label: "Total orders", value: "1,284", icon: ShoppingBag, change: "+12.4%", tone: "primary" as const },
  { label: "Total customers", value: "468", icon: Users, change: "+5.1%", tone: "info" as const },
  { label: "Revenue (7d)", value: "₹1.32L", icon: IndianRupee, change: "+8.7%", tone: "success" as const },
  { label: "Avg. order value", value: "₹524", icon: TrendingUp, change: "+2.3%", tone: "warning" as const },
];

function Dashboard() {
  return (
    <AdminShell title="Dashboard">
      <div className="grid grid-cols-2 gap-3 md:gap-5 lg:grid-cols-4">
        {stats.map((s) => {
          const toneMap = {
            primary: "bg-primary-soft text-primary",
            info: "bg-chart-4/15 text-chart-4",
            success: "bg-success/15 text-success",
            warning: "bg-warning/15 text-warning-foreground",
          } as const;
          return (
            <div key={s.label} className="rounded-2xl border bg-card p-4 shadow-soft md:p-5">
              <div className="flex items-start justify-between">
                <div className={"grid h-10 w-10 place-items-center rounded-xl " + toneMap[s.tone]}>
                  <s.icon className="h-5 w-5" />
                </div>
                <span className="inline-flex items-center gap-0.5 rounded-full bg-success/15 px-2 py-0.5 text-[11px] font-semibold text-success">
                  <ArrowUpRight className="h-3 w-3" /> {s.change}
                </span>
              </div>
              <p className="mt-3 text-2xl font-bold tracking-tight">{s.value}</p>
              <p className="text-xs text-muted-foreground">{s.label}</p>
            </div>
          );
        })}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-semibold">Sales overview</h3>
              <p className="text-xs text-muted-foreground">Last 7 days revenue</p>
            </div>
            <select className="rounded-xl border bg-card px-3 py-1.5 text-xs font-medium">
              <option>7 days</option><option>30 days</option><option>90 days</option>
            </select>
          </div>
          <div className="mt-4 h-64">
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
                <Tooltip contentStyle={{ borderRadius: 12, border: "1px solid oklch(0.92 0.01 140)" }} />
                <Area type="monotone" dataKey="sales" stroke="oklch(0.58 0.17 148)" strokeWidth={2.5} fill="url(#g)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Top customers</h3>
          <p className="text-xs text-muted-foreground">By total spend</p>
          <ul className="mt-4 space-y-3">
            {customers.slice(0, 5).map((c, i) => (
              <li key={c.id} className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">{c.name.split(" ").map(n => n[0]).join("")}</div>
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{c.name}</p>
                  <p className="text-[11px] text-muted-foreground">{c.orders} orders</p>
                </div>
                <span className="text-sm font-semibold">{formatPrice(c.spent)}</span>
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
