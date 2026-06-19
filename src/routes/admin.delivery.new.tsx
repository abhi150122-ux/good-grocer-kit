import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";

export const Route = createFileRoute("/admin/delivery/new")({ component: AddPartner });

function AddPartner() {
  return (
    <AdminShell title="Add delivery partner">
      <div className="mx-auto max-w-xl rounded-2xl border bg-card p-6 shadow-soft">
        <div className="space-y-4">
          <Field label="Full name" placeholder="e.g. Ravi Kumar" />
          <Field label="Mobile number" placeholder="+91 90111 22233" />
          <Field label="Email (optional)" placeholder="ravi@example.com" />
          <Select label="Assigned zone" options={["North", "South", "East", "West", "Central"]} />
          <Field label="Vehicle number" placeholder="KA 01 AB 1234" />
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Link to="/admin/delivery" className="rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold">Cancel</Link>
          <Link to="/admin/delivery" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-soft">Add partner</Link>
        </div>
      </div>
    </AdminShell>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <input placeholder={placeholder} className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40" />
    </label>
  );
}
function Select({ label, options }: { label: string; options: string[] }) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <select className="mt-1.5 w-full rounded-xl border bg-card px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-primary/40">
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </label>
  );
}
