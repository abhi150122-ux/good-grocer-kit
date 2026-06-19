import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { products, categories, productImage, formatPrice } from "@/lib/mock";
import { Plus, Search, Pencil, Trash2, FolderTree } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/admin/products")({ component: Products });

function Products() {
  const [cat, setCat] = useState<string>("all");
  const list = cat === "all" ? products : products.filter((p) => p.category === cat);
  return (
    <AdminShell
      title="Products"
      action={
        <Link to="/admin/products/new" className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-soft">
          <Plus className="h-4 w-4" /> Add product
        </Link>
      }
    >
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <div className="flex flex-1 items-center gap-2 rounded-xl border bg-card px-3 py-2 min-w-[200px]">
          <Search className="h-4 w-4 text-muted-foreground" />
          <input placeholder="Search products…" className="flex-1 bg-transparent text-sm outline-none" />
        </div>
        <Link to="/admin/products/new" className="inline-flex md:hidden items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /></Link>
      </div>

      <div className="mb-4 flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button onClick={() => setCat("all")} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (cat === "all" ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
          All ({products.length})
        </button>
        {categories.map((c) => (
          <button key={c.id} onClick={() => setCat(c.id)} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (cat === c.id ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>
            {c.icon} {c.name}
          </button>
        ))}
        <Link to="/admin/categories" className="ml-auto inline-flex shrink-0 items-center gap-1 rounded-full border bg-card px-3 py-1.5 text-xs font-semibold">
          <FolderTree className="h-3.5 w-3.5" /> Manage categories
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] text-sm">
            <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Price</th>
                <th className="px-5 py-3 font-semibold">Stock</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {list.map((p) => (
                <tr key={p.id} className="border-t hover:bg-secondary/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <img src={productImage(p)} alt={p.name} className="h-10 w-10 rounded-lg object-cover" />
                      <div className="min-w-0">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="text-[11px] text-muted-foreground">{p.unit}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(p.price)} <span className="text-[11px] text-muted-foreground line-through">{formatPrice(p.mrp)}</span></td>
                  <td className="px-5 py-3">
                    {p.stock === 0 ? <StatusChip tone="danger">Out of stock</StatusChip>
                      : p.stock < 10 ? <StatusChip tone="warning">Low · {p.stock}</StatusChip>
                      : <StatusChip tone="success">{p.stock} in stock</StatusChip>}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex justify-end gap-1">
                      <Link to="/admin/products/$id" params={{ id: p.id }} className="grid h-8 w-8 place-items-center rounded-lg border bg-card"><Pencil className="h-3.5 w-3.5" /></Link>
                      <button className="grid h-8 w-8 place-items-center rounded-lg border bg-card text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
