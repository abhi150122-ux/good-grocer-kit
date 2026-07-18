import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { addresses } from "@/lib/mock";
import { Home, Briefcase, MapPin, Plus, Pencil, Trash2, Check } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/customer/addresses")({ component: Addresses });

function Addresses() {
  const [selected, setSelected] = useState(addresses.find((a) => a.default)?.id ?? addresses[0].id);

  return (
    <MobileFrame>
      <PageHeader title="Saved addresses" subtitle={`${addresses.length} saved locations`} back="/customer/profile" />
      <div className="relative flex-1 space-y-3 p-4 pb-28">
        {addresses.map((a) => {
          const Icon = a.label === "Home" ? Home : a.label === "Work" ? Briefcase : MapPin;
          const active = selected === a.id;
          return (
            <button
              key={a.id}
              onClick={() => setSelected(a.id)}
              className={
                "group relative w-full overflow-hidden rounded-3xl border bg-card p-4 text-left transition shadow-soft " +
                (active ? "border-primary/60 ring-2 ring-primary/30 shadow-card" : "hover:shadow-card")
              }
            >
              {active && (
                <span className="absolute right-4 top-4 grid h-6 w-6 place-items-center rounded-full bg-primary text-primary-foreground shadow-soft">
                  <Check className="h-3.5 w-3.5" />
                </span>
              )}
              <div className="flex items-start gap-3">
                <div className={"grid h-11 w-11 shrink-0 place-items-center rounded-2xl " + (active ? "bg-primary text-primary-foreground" : "bg-primary-soft text-primary")}>
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-sm font-bold">{a.label}</p>
                    <span className={"rounded-full px-2 py-0.5 text-[10px] font-semibold " + (a.label === "Home" ? "bg-primary-soft text-primary" : a.label === "Work" ? "bg-accent text-accent-foreground" : "bg-secondary text-secondary-foreground")}>
                      {a.label}
                    </span>
                    {a.default && (
                      <span className="rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">Default</span>
                    )}
                  </div>
                  <p className="mt-1.5 text-[13px] leading-snug text-muted-foreground">
                    {a.line}, {a.area}, {a.city}
                  </p>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-2 border-t border-dashed pt-3">
                <IconAction icon={Pencil} label="Edit" />
                <IconAction icon={Trash2} label="Delete" tone="danger" />
                <div className="ml-auto text-[11px] font-semibold text-primary">
                  {active ? "Selected" : "Tap to select"}
                </div>
              </div>
            </button>
          );
        })}

        {/* Floating add button */}
        <Link
          to="/customer/add-address"
          className="fixed bottom-6 left-1/2 z-20 flex h-14 -translate-x-1/2 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-pop md:absolute md:bottom-6"
        >
          <span className="grid h-8 w-8 place-items-center rounded-full bg-primary-foreground/15">
            <Plus className="h-4 w-4" />
          </span>
          Add new address
        </Link>
      </div>
    </MobileFrame>
  );
}

function IconAction({ icon: Icon, label, tone = "neutral" }: { icon: any; label: string; tone?: "neutral" | "danger" }) {
  const cls =
    tone === "danger"
      ? "border-destructive/20 bg-destructive/5 text-destructive hover:bg-destructive/10"
      : "bg-secondary text-secondary-foreground hover:bg-secondary/80";
  return (
    <span className={"inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] font-semibold transition " + cls}>
      <Icon className="h-3.5 w-3.5" />
      {label}
    </span>
  );
}
