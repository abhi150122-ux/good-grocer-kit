import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { categories, products } from "@/lib/mock";
import { Plus, Pencil, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/categories")({ component: Cats });

function Cats() {
  return (
    <AdminShell
      title="Categories"
      action={<button className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Add</button>}
    >
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <div key={c.id} className="flex items-center gap-3 rounded-2xl border bg-card p-4 shadow-soft">
              <div className="grid h-14 w-14 place-items-center rounded-2xl text-3xl" style={{ background: c.color }}>{c.icon}</div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{count} products</p>
              </div>
              <button className="grid h-8 w-8 place-items-center rounded-lg border bg-card"><Pencil className="h-3.5 w-3.5" /></button>
              <button className="grid h-8 w-8 place-items-center rounded-lg border bg-card text-destructive"><Trash2 className="h-3.5 w-3.5" /></button>
            </div>
          );
        })}
      </div>
    </AdminShell>
  );
}
