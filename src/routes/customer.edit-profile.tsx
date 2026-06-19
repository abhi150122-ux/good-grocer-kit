import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { Camera } from "lucide-react";

export const Route = createFileRoute("/customer/edit-profile")({ component: EditProfile });

function EditProfile() {
  return (
    <MobileFrame>
      <PageHeader title="Edit profile" back="/customer/profile" />
      <div className="flex flex-1 flex-col overflow-y-auto p-5">
        <div className="grid place-items-center">
          <div className="relative">
            <div className="grid h-24 w-24 place-items-center rounded-full bg-primary text-2xl font-bold text-primary-foreground">AS</div>
            <button className="absolute bottom-0 right-0 grid h-8 w-8 place-items-center rounded-full bg-card shadow-card"><Camera className="h-4 w-4" /></button>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <Field label="Full name" value="Aarav Sharma" />
          <Field label="Email" value="aarav@example.com" />
          <Field label="Mobile" value="+91 98765 43210" disabled />
          <Field label="Date of birth" value="14 Aug 1996" type="date" />
        </div>

        <Link to="/customer/profile" className="mt-8 grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card">
          Save changes
        </Link>
      </div>
    </MobileFrame>
  );
}

function Field({ label, value, disabled, type = "text" }: { label: string; value: string; disabled?: boolean; type?: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input
        type={type}
        defaultValue={value}
        disabled={disabled}
        className="mt-1.5 w-full rounded-2xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40 disabled:bg-muted disabled:text-muted-foreground"
      />
    </label>
  );
}
