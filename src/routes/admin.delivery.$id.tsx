import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { partners } from "@/lib/mock";

export const Route = createFileRoute("/admin/delivery/$id")({
  component: EditPartner,
  loader: ({ params }) => {
    const p = partners.find((p) => p.id === params.id);
    if (!p) throw notFound();
    return p;
  },
});

function EditPartner() {
  const { id } = Route.useParams();
  const p = partners.find((p) => p.id === id)!;
  return (
    <AdminShell title={`Edit · ${p.name}`}>
      <div className="mx-auto max-w-xl rounded-2xl border bg-card p-6 shadow-soft">
        <div className="space-y-4">
          <Field label="Full name" value={p.name} />
          <Field label="Mobile number" value={p.phone} />
          <Select label="Assigned zone" value={p.zone} options={["North", "South", "East", "West", "Central"]} />
          <div className="rounded-xl border p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-semibold">Active</p>
                <p className="text-[11px] text-muted-foreground">Currently {p.active ? "accepting" : "not accepting"} new orders.</p>
              </div>
              <button className={"h-6 w-11 rounded-full p-0.5 transition " + (p.active ? "bg-primary" : "bg-muted")}>
                <span className={"block h-5 w-5 rounded-full bg-card shadow-soft transition " + (p.active ? "translate-x-5" : "")} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6 flex justify-between gap-2">
          <button className="rounded-xl border border-destructive/40 bg-card px-4 py-2.5 text-sm font-semibold text-destructive">Remove</button>
          <div className="flex gap-2">
            <Link to="/admin/delivery" className="rounded-xl border bg-card px-5 py-2.5 text-sm font-semibold">Cancel</Link>
            <Link to="/admin/delivery" className="rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground">Save</Link>
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
