import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { partners, salesData, formatPrice } from "@/lib/mock";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend } from "recharts";
import { ShoppingBag, Clock, CheckCircle2, Banknote, QrCode, Bike } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({ component: Reports });

const cards = [
  { label: "Total orders", value: "1,284", icon: ShoppingBag, tone: "bg-primary-soft text-primary" },
  { label: "Pending orders", value: "32", icon: Clock, tone: "bg-warning/15 text-warning-foreground" },
  { label: "Completed orders", value: "1,184", icon: CheckCircle2, tone: "bg-success/15 text-success" },
  { label: "COD orders", value: "542", icon: Banknote, tone: "bg-chart-4/15 text-chart-4" },
  { label: "UPI orders", value: "742", icon: QrCode, tone: "bg-chart-5/15 text-chart-5" },
  { label: "Avg delivery time", value: "28 min", icon: Bike, tone: "bg-accent text-accent-foreground" },
];

const paymentMix = [
  { name: "UPI / QR", value: 742, color: "oklch(0.58 0.17 148)" },
  { name: "COD", value: 542, color: "oklch(0.78 0.16 75)" },
];

function Reports() {
  return (
    <AdminShell title="Reports">
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-3">
        {cards.map((c) => (
          <div key={c.label} className="rounded-2xl border bg-card p-4 shadow-soft md:p-5">
            <div className="flex items-center gap-3">
              <div className={"grid h-10 w-10 place-items-center rounded-xl " + c.tone}><c.icon className="h-5 w-5" /></div>
              <div>
                <p className="text-2xl font-bold leading-none">{c.value}</p>
                <p className="mt-1 text-xs text-muted-foreground">{c.label}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <h3 className="text-sm font-semibold">Weekly orders</h3>
          <p className="text-xs text-muted-foreground">Order volume over the last 7 days</p>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={salesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                <XAxis dataKey="day" tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: 12 }} formatter={(v: number) => formatPrice(v)} />
                <Bar dataKey="sales" fill="oklch(0.58 0.17 148)" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <h3 className="text-sm font-semibold">Payment split</h3>
          <p className="text-xs text-muted-foreground">UPI vs COD</p>
          <div className="mt-4 h-52">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={paymentMix} dataKey="value" innerRadius={50} outerRadius={75} paddingAngle={4}>
                  {paymentMix.map((p) => <Cell key={p.name} fill={p.color} />)}
                </Pie>
                <Legend iconType="circle" />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold">Delivery partner performance</h3>
        <p className="text-xs text-muted-foreground">Deliveries completed this month</p>
        <ul className="mt-4 space-y-3">
          {partners.map((p) => {
            const max = Math.max(...partners.map((x) => x.deliveries));
            const pct = Math.round((p.deliveries / max) * 100);
            return (
              <li key={p.id}>
                <div className="flex justify-between text-sm">
                  <span className="font-medium">{p.name}</span>
                  <span className="text-muted-foreground">{p.deliveries} deliveries</span>
                </div>
                <div className="mt-1.5 h-2 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full rounded-full bg-primary" style={{ width: pct + "%" }} />
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </AdminShell>
  );
}
