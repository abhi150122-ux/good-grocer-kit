import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/customer/add-address")({ component: AddAddress });

function AddAddress() {
  return (
    <MobileFrame>
      <PageHeader title="Add address" back="/customer/addresses" />
      <div className="flex flex-1 flex-col overflow-y-auto p-5">
        <div className="grid h-40 place-items-center rounded-2xl bg-gradient-to-br from-primary-soft to-accent/40 text-primary">
          <div className="text-center">
            <MapPin className="mx-auto h-10 w-10" />
            <p className="mt-2 text-xs font-semibold">Map preview</p>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="House / flat no." placeholder="e.g. 402, A wing" />
          <Field label="Building / area" placeholder="e.g. Sunshine Apartments, Koramangala" />
          <Field label="Landmark (optional)" placeholder="e.g. Near Forum Mall" />
          <Field label="Pincode" placeholder="560034" />
          <div>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">Save as</p>
            <div className="flex gap-2">
              {["Home", "Work", "Other"].map((t, i) => (
                <button key={t} className={"flex-1 rounded-full border py-2 text-xs font-semibold " + (i === 0 ? "border-primary bg-primary-soft text-primary" : "bg-card")}>
                  {t}
                </button>
              ))}
            </div>
          </div>
        </div>

        <Link to="/customer/addresses" className="mt-8 grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card">
          Save address
        </Link>
      </div>
    </MobileFrame>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="mt-1.5 w-full rounded-2xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
