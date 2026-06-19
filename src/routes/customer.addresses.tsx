import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { addresses } from "@/lib/mock";
import { Home, Briefcase, Plus, MoreHorizontal } from "lucide-react";

export const Route = createFileRoute("/customer/addresses")({ component: Addresses });

function Addresses() {
  return (
    <MobileFrame>
      <PageHeader title="Saved addresses" back="/customer/profile" />
      <div className="space-y-3 p-4">
        {addresses.map((a) => {
          const Icon = a.label === "Home" ? Home : Briefcase;
          return (
            <div key={a.id} className="rounded-2xl border bg-card p-4 shadow-soft">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-8 w-8 place-items-center rounded-xl bg-primary-soft text-primary"><Icon className="h-4 w-4" /></div>
                  <p className="text-sm font-semibold">{a.label}</p>
                  {a.default && <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">Default</span>}
                </div>
                <button className="grid h-8 w-8 place-items-center rounded-full bg-secondary"><MoreHorizontal className="h-4 w-4" /></button>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{a.line}, {a.area}, {a.city}</p>
              <div className="mt-3 flex gap-2">
                <button className="flex-1 rounded-full border bg-card py-2 text-xs font-semibold">Edit</button>
                <button className="flex-1 rounded-full border bg-card py-2 text-xs font-semibold text-destructive">Remove</button>
              </div>
            </div>
          );
        })}
        <Link
          to="/customer/add-address"
          className="flex items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-primary/40 bg-card py-4 text-sm font-semibold text-primary"
        >
          <Plus className="h-4 w-4" /> Add new address
        </Link>
      </div>
    </MobileFrame>
  );
}
