import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { partners } from "@/lib/mock";
import { Plus, Pencil, Phone } from "lucide-react";

export const Route = createFileRoute("/admin/delivery")({ component: DeliveryPartners });

function DeliveryPartners() {
  return (
    <AdminShell
      title="Delivery partners"
      action={<Link to="/admin/delivery/new" className="hidden md:inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Add partner</Link>}
    >
      <div className="mb-4 lg:hidden">
        <Link to="/admin/delivery/new" className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"><Plus className="h-4 w-4" /> Add partner</Link>
      </div>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {partners.map((p) => (
          <div key={p.id} className="rounded-2xl border bg-card p-5 shadow-soft">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-primary-soft text-sm font-bold text-primary">{p.name.split(" ").map(n => n[0]).join("")}</div>
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground">{p.zone} zone</p>
                </div>
              </div>
              <StatusChip tone={p.active ? "success" : "neutral"}>{p.active ? "Active" : "Paused"}</StatusChip>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2 rounded-xl bg-secondary/40 p-3 text-center">
              <div>
                <p className="text-base font-bold">{p.deliveries}</p>
                <p className="text-[10px] text-muted-foreground">Deliveries</p>
              </div>
              <div>
                <p className="text-base font-bold">★ {p.rating}</p>
                <p className="text-[10px] text-muted-foreground">Rating</p>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between">
              <a className="flex items-center gap-1 text-xs text-muted-foreground"><Phone className="h-3.5 w-3.5" /> {p.phone}</a>
              <div className="flex gap-1">
                <Link to="/admin/delivery/$id" params={{ id: p.id }} className="grid h-8 w-8 place-items-center rounded-lg border bg-card"><Pencil className="h-3.5 w-3.5" /></Link>
                <button className={"rounded-lg border px-3 text-[11px] font-semibold " + (p.active ? "border-destructive/40 text-destructive" : "border-success/40 text-success")}>
                  {p.active ? "Deactivate" : "Activate"}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
