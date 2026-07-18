import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { Home, Briefcase, MapPin, Navigation, Building2, Hash, Landmark, Map as MapIcon, Check } from "lucide-react";

export const Route = createFileRoute("/customer/add-address")({ component: AddAddress });

function AddAddress() {
  const [tag, setTag] = useState<"Home" | "Work" | "Other">("Home");

  return (
    <MobileFrame>
      <PageHeader title="Add new address" back="/customer/addresses" />
      <div className="flex flex-1 flex-col overflow-y-auto pb-28">
        {/* Map preview */}
        <div className="relative m-4 h-44 overflow-hidden rounded-3xl bg-gradient-to-br from-primary-soft via-accent/40 to-primary-soft shadow-card">
          <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 20% 30%, oklch(0.85 0.12 148) 0 2px, transparent 2px), radial-gradient(circle at 70% 60%, oklch(0.85 0.12 148) 0 2px, transparent 2px)", backgroundSize: "24px 24px" }} />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-full">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-primary text-primary-foreground shadow-pop">
              <MapPin className="h-5 w-5" />
            </div>
            <div className="mx-auto mt-0.5 h-2 w-2 rotate-45 bg-primary" />
          </div>
          <button className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full bg-card px-3 py-2 text-[11px] font-semibold text-primary shadow-card">
            <Navigation className="h-3.5 w-3.5" /> Use current location
          </button>
        </div>

        {/* Tag selector */}
        <div className="px-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Save address as</p>
          <div className="mt-2 grid grid-cols-3 gap-2">
            {[
              { k: "Home" as const, icon: Home },
              { k: "Work" as const, icon: Briefcase },
              { k: "Other" as const, icon: MapPin },
            ].map((t) => (
              <button
                key={t.k}
                onClick={() => setTag(t.k)}
                className={
                  "flex flex-col items-center gap-1.5 rounded-2xl border py-3 text-xs font-bold transition " +
                  (tag === t.k
                    ? "border-primary bg-primary-soft text-primary shadow-soft"
                    : "bg-card text-muted-foreground")
                }
              >
                <t.icon className="h-4 w-4" />
                {t.k}
              </button>
            ))}
          </div>
        </div>

        {/* Form card */}
        <div className="m-5 mt-6 space-y-3 rounded-3xl border bg-card p-5 shadow-card">
          <Field label="Full address" icon={MapIcon} placeholder="Search or type your full address" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="House / Flat no." icon={Hash} placeholder="402" />
            <Field label="Landmark" icon={Landmark} placeholder="Near Forum Mall" />
          </div>
          <Field label="Area / Locality" icon={Building2} placeholder="Kantatoli" />
          <div className="grid grid-cols-2 gap-3">
            <Field label="City" icon={Building2} placeholder="Ranchi" />
            <Field label="State" icon={MapIcon} placeholder="Jharkhand" />
          </div>
          <Field label="PIN code" icon={Hash} placeholder="834001" inputMode="numeric" />
        </div>
      </div>

      {/* Sticky save */}
      <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t bg-card/95 p-4 backdrop-blur md:rounded-b-[2.5rem]">
        <Link
          to="/customer/addresses"
          className="flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-primary text-sm font-bold text-primary-foreground shadow-card active:scale-[0.98]"
        >
          <Check className="h-4 w-4" /> Save address
        </Link>
      </div>
    </MobileFrame>
  );
}

function Field({
  label, icon: Icon, placeholder, inputMode,
}: { label: string; icon: any; placeholder: string; inputMode?: "text" | "numeric" }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-3 rounded-2xl border bg-background px-3.5 py-3 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">
          <Icon className="h-4 w-4" />
        </span>
        <input
          placeholder={placeholder}
          inputMode={inputMode}
          className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}
