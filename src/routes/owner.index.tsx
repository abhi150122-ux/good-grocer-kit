import { createFileRoute, Link } from "@tanstack/react-router";
import { OwnerShell, OwnerHeader } from "@/components/OwnerShell";
import { StatusChip } from "@/components/ui-bits";
import { orders, partners, formatPrice } from "@/lib/mock";
import { Bell, ArrowRight, ShoppingBag, Bike, IndianRupee, Clock } from "lucide-react";

export const Route = createFileRoute("/owner/")({ component: OwnerHome });

function OwnerHome() {
  const pending = orders.filter((o) => o.status === "Pending");
  const today = orders.filter((o) => o.status !== "Rejected");
  const revenue = today.reduce((s, o) => s + o.total, 0);
  const activePartners = partners.filter((p) => p.active).length;

  return (
    <OwnerShell>
      <OwnerHeader
        title="FreshCart Koramangala"
        right={
          <Link to="/owner/notifications" className="relative grid h-10 w-10 place-items-center rounded-2xl bg-primary-foreground/15">
            <Bell className="h-5 w-5" />
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-warning" />
          </Link>
        }
      />

      <div className="-mt-4 space-y-4 px-4">
        <div className="grid grid-cols-3 gap-2">
          <Stat icon={ShoppingBag} label="Orders" value={today.length.toString()} />
          <Stat icon={IndianRupee} label="Revenue" value={formatPrice(revenue)} />
          <Stat icon={Bike} label="Partners" value={activePartners.toString()} />
        </div>

        <Link to="/owner/orders" className="flex items-center justify-between rounded-2xl border border-warning/30 bg-warning/10 p-4">
          <div className="flex items-center gap-3">
            <div className="grid h-10 w-10 place-items-center rounded-xl bg-warning text-warning-foreground"><Clock className="h-5 w-5" /></div>
            <div>
              <p className="text-sm font-semibold">{pending.length} pending orders</p>
              <p className="text-[11px] text-muted-foreground">Accept or reject and assign a partner</p>
            </div>
          </div>
          <ArrowRight className="h-4 w-4 text-muted-foreground" />
        </Link>

        <div>
          <div className="mb-2 flex items-center justify-between px-1">
            <p className="text-sm font-semibold">Recent orders</p>
            <Link to="/owner/orders" className="text-xs font-semibold text-primary">View all</Link>
          </div>
          <div className="space-y-2">
            {orders.slice(0, 4).map((o) => (
              <Link key={o.id} to="/owner/orders/$id" params={{ id: o.id }} className="flex items-center justify-between rounded-2xl border bg-card p-3 shadow-soft">
                <div className="min-w-0">
                  <p className="text-sm font-semibold">#{o.id}</p>
                  <p className="truncate text-[11px] text-muted-foreground">{o.customer} · {o.items.length} items</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span className="text-sm font-bold">{formatPrice(o.total)}</span>
                  <StatusChip tone={o.status === "Delivered" ? "success" : o.status === "Rejected" ? "danger" : o.status === "Pending" ? "warning" : "info"}>{o.status}</StatusChip>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </OwnerShell>
  );
}

function Stat({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="rounded-2xl border bg-card p-3 shadow-soft">
      <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary-soft text-primary"><Icon className="h-4 w-4" /></div>
      <p className="mt-2 text-sm font-bold leading-none">{value}</p>
      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground">{label}</p>
    </div>
  );
}
