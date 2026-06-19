import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { products, productImage, categories } from "@/lib/mock";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/products/$id")({
  component: EditProduct,
  loader: ({ params }) => {
    const p = products.find((p) => p.id === params.id);
    if (!p) throw notFound();
    return p;
  },
});

function EditProduct() {
  const { id } = Route.useParams();
  const p = products.find((p) => p.id === id)!;
  return (
    <AdminShell title={`Edit · ${p.name}`}>
      <div className="mx-auto max-w-3xl">
        <div className="grid gap-5 md:grid-cols-3">
          <div className="rounded-2xl border bg-card p-5 shadow-soft">
            <img src={productImage(p)} alt={p.name} className="aspect-square w-full rounded-xl object-cover" />
            <button className="mt-3 w-full rounded-xl border bg-card py-2 text-xs font-semibold">Replace image</button>
          </div>
          <div className="rounded-2xl border bg-card p-5 shadow-soft md:col-span-2 space-y-4">
            <Field label="Product name" value={p.name} />
            <div className="grid grid-cols-2 gap-3">
              <Field label="Unit" value={p.unit} />
              <Select label="Category" value={categories.find((c) => c.id === p.category)?.name ?? ""} options={categories.map((c) => c.name)} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Price (₹)" value={String(p.price)} />
              <Field label="MRP (₹)" value={String(p.mrp)} />
            </div>
            <Field label="Stock" value={String(p.stock)} />
            <label className="block">
              <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Description</span>
              <textarea defaultValue={p.description} rows={4} className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
            </label>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap justify-between gap-2">
          <button className="inline-flex items-center gap-2 rounded-xl border border-destructive/40 bg-card px-4 py-2.5 text-sm font-semibold text-destructive">
            <Trash2 className="h-4 w-4" /> Delete product
          </button>
          <div className="flex gap-2">
            <Link to="/admin/products" className="rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold">Cancel</Link>
            <Link to="/admin/products" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">Save changes</Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input defaultValue={value} className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
function Select({ label, options, value }: { label: string; options: string[]; value: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <select defaultValue={value} className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
