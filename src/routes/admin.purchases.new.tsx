import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { suppliers, inventory, rupees } from "@/lib/erp-mock";
import { ArrowLeft, Plus, Trash2, Save } from "lucide-react";

export const Route = createFileRoute("/admin/purchases/new")({ component: NewPurchase });

type Row = { id: string; productId: string; qty: number; rate: number; gst: number };

function NewPurchase() {
  const router = useRouter();
  const [supplier, setSupplier] = useState(suppliers[0].id);
  const [poNumber] = useState("PO-2025-" + Math.floor(1000 + Math.random() * 8999));
  const [date, setDate] = useState("2026-07-22");
  const [status, setStatus] = useState("Unpaid");
  const [rows, setRows] = useState<Row[]>([{ id: crypto.randomUUID(), productId: inventory[0].id, qty: 10, rate: inventory[0].purchasePrice, gst: 5 }]);

  const totals = useMemo(() => {
    let subtotal = 0, tax = 0;
    for (const r of rows) { subtotal += r.qty * r.rate; tax += (r.qty * r.rate * r.gst) / 100; }
    return { subtotal, tax, total: subtotal + tax };
  }, [rows]);

  const update = (id: string, patch: Partial<Row>) => setRows((prev) => prev.map((r) => (r.id === id ? { ...r, ...patch } : r)));

  return (
    <AdminShell title="New Purchase Entry">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => router.history.back()} className="grid h-9 w-9 place-items-center rounded-xl border bg-card"><ArrowLeft className="h-4 w-4" /></button>
        <p className="text-sm text-muted-foreground">Back to purchases</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Purchase details</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="Supplier">
                <select value={supplier} onChange={(e) => setSupplier(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm">
                  {suppliers.map((s) => <option key={s.id} value={s.id}>{s.name}</option>)}
                </select>
              </Field>
              <Field label="PO number"><input readOnly value={poNumber} className="w-full rounded-xl border bg-secondary/40 px-3 py-2 text-sm" /></Field>
              <Field label="Date"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm" /></Field>
              <Field label="Payment status">
                <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm">
                  {["Paid", "Partial", "Unpaid"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Items</h3>
              <button onClick={() => setRows((r) => [...r, { id: crypto.randomUUID(), productId: inventory[0].id, qty: 1, rate: inventory[0].purchasePrice, gst: 5 }])} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" /> Add row</button>
            </div>
            <div className="mt-4 -mx-5 overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b"><th className="px-5 py-2">Product</th><th className="px-3">Qty</th><th className="px-3">Rate</th><th className="px-3">GST</th><th className="px-5 text-right">Total</th><th /></tr>
                </thead>
                <tbody>
                  {rows.map((r) => {
                    const p = inventory.find((i) => i.id === r.productId)!;
                    const amt = r.qty * r.rate * (1 + r.gst / 100);
                    return (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="px-5 py-2">
                          <select value={r.productId} onChange={(e) => { const prod = inventory.find((i) => i.id === e.target.value)!; update(r.id, { productId: prod.id, rate: prod.purchasePrice }); }} className="w-52 rounded-lg border bg-card px-2 py-1.5 text-sm">
                            {inventory.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                          </select>
                          <p className="mt-1 text-[10px] text-muted-foreground">{p.unit}</p>
                        </td>
                        <td className="px-3"><input type="number" value={r.qty} onChange={(e) => update(r.id, { qty: +e.target.value })} className="w-20 rounded-lg border bg-card px-2 py-1.5 text-sm" /></td>
                        <td className="px-3"><input type="number" value={r.rate} onChange={(e) => update(r.id, { rate: +e.target.value })} className="w-24 rounded-lg border bg-card px-2 py-1.5 text-sm" /></td>
                        <td className="px-3"><select value={r.gst} onChange={(e) => update(r.id, { gst: +e.target.value })} className="w-20 rounded-lg border bg-card px-2 py-1.5 text-sm">{[0,5,12,18,28].map((g) => <option key={g} value={g}>{g}%</option>)}</select></td>
                        <td className="px-5 text-right font-semibold">{rupees(Math.round(amt))}</td>
                        <td><button onClick={() => setRows((prev) => prev.filter((x) => x.id !== r.id))} className="grid h-7 w-7 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <div className="rounded-2xl border border-primary/30 bg-primary-soft p-4 text-sm">
            <p className="font-semibold">Stock auto-update</p>
            <p className="mt-1 text-xs text-muted-foreground">Saving this purchase will automatically increase stock for the selected products in your inventory.</p>
          </div>
        </div>

        <aside className="space-y-3">
          <div className="sticky top-24 rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Totals</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={rupees(totals.subtotal)} />
              <Row label="GST" value={rupees(Math.round(totals.tax))} />
              <div className="my-2 border-t" />
              <Row label="Grand total" value={rupees(Math.round(totals.total))} bold />
            </dl>
            <button className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Save className="h-4 w-4" /> Save purchase</button>
            <Link to="/admin/purchases" className="mt-2 flex items-center justify-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-semibold">Cancel</Link>
          </div>
        </aside>
      </div>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs font-medium text-muted-foreground">{label}</span>{children}</label>;
}
function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return <div className="flex items-center justify-between"><dt className="text-muted-foreground">{label}</dt><dd className={bold ? "text-base font-bold" : "font-medium"}>{value}</dd></div>;
}
