import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { customers, orders, formatPrice } from "@/lib/mock";
import { Mail, Phone, MapPin } from "lucide-react";

export const Route = createFileRoute("/admin/customers/$id")({
  component: CustomerDetails,
  loader: ({ params }) => {
    const c = customers.find((c) => c.id === params.id);
    if (!c) throw notFound();
    return c;
  },
});

function CustomerDetails() {
  const { id } = Route.useParams();
  const c = customers.find((c) => c.id === id)!;
  const list = orders.filter((o) => o.customer === c.name);

  return (
    <AdminShell title={c.name}>
      <div className="grid gap-5 lg:grid-cols-3">
        <div className="rounded-2xl border bg-card p-5 shadow-soft">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-lg font-bold text-primary-foreground">{c.name.split(" ").map(n => n[0]).join("")}</div>
          <h2 className="mt-3 text-lg font-semibold">{c.name}</h2>
          <p className="text-xs text-muted-foreground">Customer since {c.joined}</p>
          <div className="mt-4 space-y-2 text-sm">
            <p className="flex items-center gap-2"><Phone className="h-4 w-4 text-muted-foreground" /> {c.phone}</p>
            <p className="flex items-center gap-2"><Mail className="h-4 w-4 text-muted-foreground" /> {c.name.split(" ")[0].toLowerCase()}@example.com</p>
            <p className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-muted-foreground" /> Koramangala, Bengaluru</p>
          </div>
          <div className="mt-5 grid grid-cols-2 gap-2 rounded-xl bg-secondary/40 p-3 text-center">
            <div>
              <p className="text-lg font-bold">{c.orders}</p>
              <p className="text-[11px] text-muted-foreground">Orders</p>
            </div>
            <div>
              <p className="text-lg font-bold">{formatPrice(c.spent)}</p>
              <p className="text-[11px] text-muted-foreground">Lifetime value</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border bg-card p-5 shadow-soft lg:col-span-2">
          <h3 className="text-sm font-semibold">Order history</h3>
          <div className="mt-3 divide-y">
            {(list.length ? list : orders.slice(0, 4)).map((o) => (
              <Link key={o.id} to="/admin/orders/$id" params={{ id: o.id }} className="flex items-center justify-between py-3 text-sm hover:bg-secondary/30">
                <div>
                  <p className="font-semibold text-primary">#{o.id}</p>
                  <p className="text-[11px] text-muted-foreground">{o.placedAt} · {o.items.length} items</p>
                </div>
                <div className="flex items-center gap-3">
                  <StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : "info"}>{o.status}</StatusChip>
                  <span className="font-semibold">{formatPrice(o.total)}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
