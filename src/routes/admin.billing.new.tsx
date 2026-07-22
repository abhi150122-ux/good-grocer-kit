import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { AdminShell } from "@/components/AdminShell";
import { inventory, rupees, type InvoiceType } from "@/lib/erp-mock";
import { customers } from "@/lib/mock";
import { Plus, Trash2, ArrowLeft, Save, Send } from "lucide-react";

export const Route = createFileRoute("/admin/billing/new")({ component: NewInvoice });

type Line = { id: string; productId: string; qty: number; rate: number; discount: number; gst: number };

function NewInvoice() {
  const router = useRouter();
  const [type, setType] = useState<InvoiceType>("GST Invoice");
  const [customer, setCustomer] = useState(customers[0].id);
  const [invNumber] = useState("INV-2025-" + Math.floor(1000 + Math.random() * 8999));
  const [date, setDate] = useState("2026-07-22");
  const [dueDate, setDueDate] = useState("2026-08-05");
  const [payStatus, setPayStatus] = useState("Unpaid");
  const [notes, setNotes] = useState("");
  const [lines, setLines] = useState<Line[]>([{ id: crypto.randomUUID(), productId: inventory[0].id, qty: 1, rate: inventory[0].sellingPrice, discount: 0, gst: 5 }]);

  const cust = customers.find((c) => c.id === customer)!;

  const totals = useMemo(() => {
    let subtotal = 0, tax = 0;
    for (const l of lines) {
      const g = l.qty * l.rate - l.discount;
      subtotal += g;
      tax += (g * l.gst) / 100;
    }
    return { subtotal, tax, total: subtotal + tax };
  }, [lines]);

  const updateLine = (id: string, patch: Partial<Line>) => setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));
  const removeLine = (id: string) => setLines((prev) => prev.filter((l) => l.id !== id));
  const addLine = () => setLines((prev) => [...prev, { id: crypto.randomUUID(), productId: inventory[0].id, qty: 1, rate: inventory[0].sellingPrice, discount: 0, gst: 5 }]);

  return (
    <AdminShell title="Create Invoice">
      <div className="mb-4 flex items-center gap-3">
        <button onClick={() => router.history.back()} className="grid h-9 w-9 place-items-center rounded-xl border bg-card"><ArrowLeft className="h-4 w-4" /></button>
        <p className="text-sm text-muted-foreground">Back to billing</p>
      </div>

      <div className="grid gap-5 lg:grid-cols-3">
        <div className="space-y-5 lg:col-span-2">
          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Invoice details</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="Document type">
                <select value={type} onChange={(e) => setType(e.target.value as InvoiceType)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm">
                  {(["GST Invoice", "Non-GST Invoice", "Quotation", "Proforma", "Delivery Challan", "Purchase Order"] as InvoiceType[]).map((t) => <option key={t}>{t}</option>)}
                </select>
              </Field>
              <Field label="Invoice number"><input readOnly value={invNumber} className="w-full rounded-xl border bg-secondary/40 px-3 py-2 text-sm" /></Field>
              <Field label="Invoice date"><input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm" /></Field>
              <Field label="Due date"><input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm" /></Field>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Customer</h3>
            <div className="mt-4 grid gap-3 md:grid-cols-2">
              <Field label="Select customer">
                <select value={customer} onChange={(e) => setCustomer(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm">
                  {customers.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </Field>
              <Field label="Mobile number"><input readOnly value={cust.phone} className="w-full rounded-xl border bg-secondary/40 px-3 py-2 text-sm" /></Field>
              <div className="md:col-span-2">
                <Field label="Billing address"><textarea rows={2} defaultValue="Flat 402, Sunshine Apartments, Koramangala 4th Block, Bengaluru 560034" className="w-full rounded-xl border bg-card px-3 py-2 text-sm" /></Field>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold">Items</h3>
              <button onClick={addLine} className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground"><Plus className="h-3.5 w-3.5" /> Add item</button>
            </div>
            <div className="mt-4 -mx-5 overflow-x-auto">
              <table className="w-full min-w-[720px] text-sm">
                <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
                  <tr className="border-b">
                    <th className="px-5 py-2">Product</th>
                    <th className="px-5 py-2">Qty</th>
                    <th className="px-5 py-2">Rate</th>
                    <th className="px-5 py-2">Discount</th>
                    <th className="px-5 py-2">GST %</th>
                    <th className="px-5 py-2 text-right">Amount</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {lines.map((l) => {
                    const p = inventory.find((i) => i.id === l.productId)!;
                    const amt = l.qty * l.rate - l.discount;
                    return (
                      <tr key={l.id} className="border-b last:border-0">
                        <td className="px-5 py-2">
                          <select value={l.productId} onChange={(e) => {
                            const prod = inventory.find((i) => i.id === e.target.value)!;
                            updateLine(l.id, { productId: prod.id, rate: prod.sellingPrice });
                          }} className="w-56 rounded-lg border bg-card px-2 py-1.5 text-sm">
                            {inventory.map((i) => <option key={i.id} value={i.id}>{i.name}</option>)}
                          </select>
                          <p className="mt-1 text-[10px] text-muted-foreground">{p.unit} · {p.sku}</p>
                        </td>
                        <td className="px-5 py-2"><input type="number" value={l.qty} onChange={(e) => updateLine(l.id, { qty: +e.target.value })} className="w-20 rounded-lg border bg-card px-2 py-1.5 text-sm" /></td>
                        <td className="px-5 py-2"><input type="number" value={l.rate} onChange={(e) => updateLine(l.id, { rate: +e.target.value })} className="w-24 rounded-lg border bg-card px-2 py-1.5 text-sm" /></td>
                        <td className="px-5 py-2"><input type="number" value={l.discount} onChange={(e) => updateLine(l.id, { discount: +e.target.value })} className="w-20 rounded-lg border bg-card px-2 py-1.5 text-sm" /></td>
                        <td className="px-5 py-2">
                          <select value={l.gst} onChange={(e) => updateLine(l.id, { gst: +e.target.value })} className="w-20 rounded-lg border bg-card px-2 py-1.5 text-sm">
                            {[0, 5, 12, 18, 28].map((g) => <option key={g} value={g}>{g}%</option>)}
                          </select>
                        </td>
                        <td className="px-5 py-2 text-right font-semibold">{rupees(amt)}</td>
                        <td className="px-2"><button onClick={() => removeLine(l.id)} className="grid h-7 w-7 place-items-center rounded-lg text-destructive hover:bg-destructive/10"><Trash2 className="h-3.5 w-3.5" /></button></td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>

          <section className="rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Notes</h3>
            <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Terms, delivery notes, thank-you message…" className="mt-3 w-full rounded-xl border bg-card px-3 py-2 text-sm" />
          </section>
        </div>

        <aside className="space-y-3">
          <div className="sticky top-24 rounded-2xl border bg-card p-5 shadow-soft">
            <h3 className="text-sm font-semibold">Summary</h3>
            <dl className="mt-4 space-y-2 text-sm">
              <Row label="Subtotal" value={rupees(totals.subtotal)} />
              <Row label="GST / Tax" value={rupees(Math.round(totals.tax))} />
              <div className="my-2 border-t" />
              <Row label="Grand total" value={rupees(Math.round(totals.total))} bold />
            </dl>
            <div className="mt-4">
              <Field label="Payment status">
                <select value={payStatus} onChange={(e) => setPayStatus(e.target.value)} className="w-full rounded-xl border bg-card px-3 py-2 text-sm">
                  {["Paid", "Partial", "Unpaid"].map((s) => <option key={s}>{s}</option>)}
                </select>
              </Field>
            </div>
            <div className="mt-4 flex flex-col gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-primary-foreground"><Save className="h-4 w-4" /> Save invoice</button>
              <Link to="/admin/billing" className="flex items-center justify-center gap-2 rounded-xl border bg-card px-4 py-2.5 text-sm font-semibold"><Send className="h-4 w-4" /> Save & share</Link>
            </div>
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
