import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { inventory, stockMovements, rupees } from "@/lib/erp-mock";
import { Boxes, AlertTriangle, PackageX, IndianRupee, Search, Barcode, Plus } from "lucide-react";

export const Route = createFileRoute("/admin/inventory")({ component: Inventory });

function Inventory() {
  const [q, setQ] = useState("");
  const list = inventory.filter((i) => i.name.toLowerCase().includes(q.toLowerCase()) || i.sku.toLowerCase().includes(q.toLowerCase()));

  const totalProducts = inventory.length;
  const invValue = inventory.reduce((s, i) => s + i.stock * i.purchasePrice, 0);
  const lowStock = inventory.filter((i) => i.stock > 0 && i.stock < i.minStock);
  const outOfStock = inventory.filter((i) => i.stock === 0);

  const cards = [
    { label: "Total products", value: totalProducts.toString(), icon: Boxes, tone: "bg-primary-soft text-primary" },
    { label: "Inventory value", value: rupees(invValue), icon: IndianRupee, tone: "bg-chart-4/15 text-chart-4" },
    { label: "Low stock", value: lowStock.length.toString(), icon: AlertTriangle, tone: "bg-warning/15 text-warning-foreground" },
    { label: "Out of stock", value: outOfStock.length.toString(), icon: PackageX, tone: "bg-destructive/15 text-destructive" },
  ];

  return (
    <AdminShell title="Inventory" action={
      <button className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-3 py-2 text-xs font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Add product</button>
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

      {(lowStock.length > 0 || outOfStock.length > 0) && (
        <div className="mt-5 rounded-2xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 h-5 w-5 text-warning-foreground" />
            <div>
              <p className="text-sm font-semibold">Stock alerts</p>
              <p className="text-xs text-muted-foreground">{outOfStock.length} out of stock · {lowStock.length} below minimum</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {[...outOfStock, ...lowStock].slice(0, 4).map((i) => (
                  <span key={i.id} className="rounded-full bg-card px-2.5 py-1 text-[11px] font-medium">{i.name}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="mt-5 rounded-2xl border bg-card p-4 shadow-soft md:p-5">
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <h3 className="text-sm font-semibold">Stock ledger</h3>
          <div className="flex items-center gap-2 rounded-xl border bg-secondary/40 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or SKU…" className="w-56 bg-transparent text-sm outline-none" />
          </div>
        </div>
        <div className="-mx-4 mt-4 overflow-x-auto md:-mx-5">
          <table className="w-full min-w-[900px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2">Product</th>
                <th className="px-5 py-2">SKU / Barcode</th>
                <th className="px-5 py-2">Unit</th>
                <th className="px-5 py-2 text-right">Purchase</th>
                <th className="px-5 py-2 text-right">Sell</th>
                <th className="px-5 py-2 text-right">Stock</th>
                <th className="px-5 py-2 text-right">Min</th>
                <th className="px-5 py-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.map((i) => {
                const status = i.stock === 0 ? { tone: "danger" as const, label: "Out of stock" } : i.stock < i.minStock ? { tone: "warning" as const, label: "Low stock" } : { tone: "success" as const, label: "In stock" };
                return (
                  <tr key={i.id} className="border-b last:border-0 hover:bg-secondary/30">
                    <td className="px-5 py-3"><p className="font-medium">{i.name}</p><p className="text-[11px] text-muted-foreground">{i.category}</p></td>
                    <td className="px-5 py-3"><p className="font-mono text-xs">{i.sku}</p><p className="mt-0.5 inline-flex items-center gap-1 text-[10px] text-muted-foreground"><Barcode className="h-3 w-3" /> {i.barcode}</p></td>
                    <td className="px-5 py-3 text-xs">{i.unit}</td>
                    <td className="px-5 py-3 text-right">{rupees(i.purchasePrice)}</td>
                    <td className="px-5 py-3 text-right font-semibold">{rupees(i.sellingPrice)}</td>
                    <td className="px-5 py-3 text-right font-bold">{i.stock}</td>
                    <td className="px-5 py-3 text-right text-muted-foreground">{i.minStock}</td>
                    <td className="px-5 py-3"><StatusChip tone={status.tone}>{status.label}</StatusChip></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-4 shadow-soft md:p-5">
        <h3 className="text-sm font-semibold">Stock movement history</h3>
        <p className="text-xs text-muted-foreground">Latest purchase, sale and adjustment entries</p>
        <div className="-mx-4 mt-4 overflow-x-auto md:-mx-5">
          <table className="w-full min-w-[640px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-5 py-2">Date</th>
                <th className="px-5 py-2">Product</th>
                <th className="px-5 py-2">Type</th>
                <th className="px-5 py-2 text-right">Qty</th>
                <th className="px-5 py-2 text-right">Balance</th>
                <th className="px-5 py-2">Reference</th>
              </tr>
            </thead>
            <tbody>
              {stockMovements.map((m) => (
                <tr key={m.id} className="border-b last:border-0">
                  <td className="px-5 py-3 text-xs">{m.date}</td>
                  <td className="px-5 py-3 font-medium">{m.product}</td>
                  <td className="px-5 py-3"><StatusChip tone={m.type === "Purchase" ? "success" : m.type === "Sale" ? "info" : "warning"}>{m.type}</StatusChip></td>
                  <td className={"px-5 py-3 text-right font-semibold " + (m.qty > 0 ? "text-success" : "text-destructive")}>{m.qty > 0 ? "+" : ""}{m.qty}</td>
                  <td className="px-5 py-3 text-right">{m.balance}</td>
                  <td className="px-5 py-3 text-xs text-primary">{m.reference}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
