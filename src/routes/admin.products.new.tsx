import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { categories } from "@/lib/mock";
import { ImagePlus } from "lucide-react";

export const Route = createFileRoute("/admin/products/new")({ component: NewProduct });

function NewProduct() {
  return (
    <AdminShell title="Add new product">
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Image</p>
            <button className="mt-3 grid aspect-square w-full place-items-center rounded-xl border-2 border-dashed bg-secondary/40 text-muted-foreground">
              <div className="text-center">
                <ImagePlus className="mx-auto h-8 w-8" />
                <p className="mt-2 text-xs font-medium">Upload product image</p>
                <p className="text-[11px]">PNG, JPG up to 4MB</p>
              </div>
            </button>
          </div>

          <div className="rounded-2xl border bg-card p-5 shadow-soft md:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Product details</p>
            <div className="mt-4 space-y-4">
              <Field label="Product name" placeholder="e.g. Fresh Red Apples" />
              <div className="grid grid-cols-2 gap-3">
                <Field label="Unit" placeholder="e.g. 1 kg" />
                <Select label="Category" options={categories.map((c) => c.name)} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Selling price (₹)" placeholder="180" />
                <Field label="MRP (₹)" placeholder="220" />
              </div>
              <Field label="Stock quantity" placeholder="24" />
              <div>
                <Label>Description</Label>
                <textarea rows={4} placeholder="Short product description" className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <Link to="/admin/products" className="rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold">Cancel</Link>
          <Link to="/admin/products" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">Save product</Link>
        </div>
      </div>
    </AdminShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{children}</span>;
}
function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <input placeholder={placeholder} className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <Label>{label}</Label>
      <select className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
