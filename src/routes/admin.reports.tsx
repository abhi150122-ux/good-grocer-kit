import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { partners, salesData, formatPrice } from "@/lib/mock";
import { monthlyProfit, rupees, topSelling } from "@/lib/erp-mock";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, PieChart, Pie, Cell, CartesianGrid, Legend, LineChart, Line } from "recharts";
import { ShoppingBag, Clock, CheckCircle2, Banknote, QrCode, Bike, FileDown, FileText, Filter, TrendingUp, Truck, Boxes, IndianRupee, Receipt, BookOpen, Building2, Percent } from "lucide-react";

export const Route = createFileRoute("/admin/reports")({ component: Reports });

type ReportKey =
  | "sales" | "purchase" | "stock" | "valuation"
  | "expense" | "customer" | "supplier" | "outstanding"
  | "cashflow" | "pnl" | "gst";

const reportMenu: { key: ReportKey; label: string; desc: string; icon: any }[] = [
  { key: "sales", label: "Sales Report", desc: "Revenue by day / month", icon: TrendingUp },
  { key: "purchase", label: "Purchase Report", desc: "Supplier-wise purchases", icon: Truck },
  { key: "stock", label: "Stock Report", desc: "Item-wise stock summary", icon: Boxes },
  { key: "valuation", label: "Inventory Valuation", desc: "Stock × cost price", icon: IndianRupee },
  { key: "expense", label: "Expense Report", desc: "Category-wise spending", icon: Receipt },
  { key: "customer", label: "Customer Ledger", desc: "Customer balances", icon: BookOpen },
  { key: "supplier", label: "Supplier Ledger", desc: "Supplier balances", icon: Building2 },
  { key: "outstanding", label: "Outstanding Payments", desc: "Overdue & pending", icon: Clock },
  { key: "cashflow", label: "Cash Flow", desc: "In / Out summary", icon: Banknote },
  { key: "pnl", label: "Profit & Loss", desc: "Monthly P&L", icon: TrendingUp },
  { key: "gst", label: "GST Report", desc: "Output / input tax", icon: Percent },
];

function Reports() {
  const [active, setActive] = useState<ReportKey>("sales");

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

      <div className="mt-5 grid gap-5 lg:grid-cols-4">
        <aside className="rounded-2xl border bg-card p-3 shadow-soft lg:col-span-1">
          <p className="px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Report types</p>
          <div className="max-h-[420px] space-y-1 overflow-y-auto lg:max-h-none">
            {reportMenu.map((r) => (
              <button key={r.key} onClick={() => setActive(r.key)} className={"flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-sm font-medium " + (active === r.key ? "bg-primary text-primary-foreground shadow-soft" : "hover:bg-secondary/60")}>
                <r.icon className="h-4 w-4" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate">{r.label}</span>
                  <span className={"block truncate text-[11px] " + (active === r.key ? "text-primary-foreground/70" : "text-muted-foreground")}>{r.desc}</span>
                </span>
              </button>
            ))}
          </div>
        </aside>

        <section className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <h3 className="text-sm font-semibold">{reportMenu.find((r) => r.key === active)!.label}</h3>
              <p className="text-xs text-muted-foreground">{reportMenu.find((r) => r.key === active)!.desc}</p>
            </div>
            <div className="flex flex-wrap items-center gap-2">
              <div className="inline-flex items-center gap-2 rounded-xl border bg-secondary/40 px-3 py-1.5 text-xs"><Filter className="h-3.5 w-3.5" /> Date range</div>
              <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-xs font-semibold"><FileDown className="h-3.5 w-3.5" /> PDF</button>
              <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-xs font-semibold"><FileDown className="h-3.5 w-3.5" /> Excel</button>
              <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-1.5 text-xs font-semibold"><FileText className="h-3.5 w-3.5" /> CSV</button>
            </div>
          </div>

          <div className="mt-5">
            {(active === "sales" || active === "purchase") && (
              <div className="h-64">
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
            )}
            {active === "pnl" && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlyProfit}>
                    <CartesianGrid strokeDasharray="3 3" stroke="oklch(0.92 0.01 140)" vertical={false} />
                    <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip formatter={(v: number) => rupees(v)} />
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                    <Line type="monotone" dataKey="revenue" stroke="oklch(0.58 0.17 148)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="expenses" stroke="oklch(0.78 0.16 75)" strokeWidth={2.5} />
                    <Line type="monotone" dataKey="profit" stroke="oklch(0.7 0.15 200)" strokeWidth={2.5} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            )}
            {active === "gst" && (
              <div className="grid gap-3 md:grid-cols-3">
                <MiniCard label="Output GST (Sales)" value="₹18,240" tone="text-primary" />
                <MiniCard label="Input GST (Purchases)" value="₹12,105" tone="text-chart-4" />
                <MiniCard label="Net GST payable" value="₹6,135" tone="text-warning-foreground" />
              </div>
            )}
            {(active === "stock" || active === "valuation" || active === "expense" || active === "cashflow" || active === "outstanding") && (
              <div className="h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={paymentMix} dataKey="value" innerRadius={50} outerRadius={80} paddingAngle={4}>
                      {paymentMix.map((p) => <Cell key={p.name} fill={p.color} />)}
                    </Pie>
                    <Legend iconType="circle" wrapperStyle={{ fontSize: 11 }} />
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            )}
            {(active === "customer" || active === "supplier") && (
              <ul className="space-y-2">
                {topSelling.map((p) => (
                  <li key={p.name} className="flex items-center justify-between rounded-xl border p-3">
                    <span className="text-sm font-medium">{p.name}</span>
                    <span className="text-sm font-bold">{rupees(p.revenue)}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
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

function MiniCard({ label, value, tone }: { label: string; value: string; tone: string }) {
  return (
    <div className="rounded-xl border bg-secondary/30 p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={"mt-1 text-2xl font-bold " + tone}>{value}</p>
    </div>
  );
}
