import { createFileRoute } from "@tanstack/react-router";
import { OwnerShell, OwnerHeader } from "@/components/OwnerShell";
import { ShoppingBag, Bike, AlertTriangle, IndianRupee, Package } from "lucide-react";

export const Route = createFileRoute("/owner/notifications")({ component: OwnerNotifs });

const items = [
  { icon: ShoppingBag, tone: "info", title: "New order #ORD2042", body: "Meera Iyer placed an order worth ₹620. Accept to start packing.", time: "Just now" },
  { icon: AlertTriangle, tone: "warning", title: "Low stock alert", body: "Butter Croissants are out of stock. Update inventory.", time: "10 min ago" },
  { icon: Bike, tone: "info", title: "Partner accepted assignment", body: "Ravi Kumar accepted delivery for order #ORD2041.", time: "22 min ago" },
  { icon: Package, tone: "success", title: "Order delivered", body: "Order #ORD2039 was delivered to Rohit Verma.", time: "1h ago" },
  { icon: IndianRupee, tone: "success", title: "Daily settlement", body: "₹18,420 will be settled to your bank by 8:00 PM today.", time: "2h ago" },
  { icon: AlertTriangle, tone: "danger", title: "Order rejected", body: "You rejected order #ORD2036 due to unavailable items.", time: "Yesterday" },
] as const;

function OwnerNotifs() {
  const tones = {
    info: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    danger: "bg-destructive/15 text-destructive",
  } as const;
  return (
    <OwnerShell>
      <OwnerHeader title="Notifications" subtitle="Store updates" />
      <div className="space-y-2 p-4">
        <div className="rounded-2xl border bg-gradient-to-r from-primary-soft to-accent/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Realtime alerts</p>
          <p className="mt-1 text-sm">New orders, low stock and partner updates appear here instantly.</p>
        </div>
        {items.map((n, i) => (
          <div key={i} className="flex gap-3 rounded-2xl border bg-card p-3 shadow-soft">
            <div className={"grid h-10 w-10 shrink-0 place-items-center rounded-xl " + tones[n.tone]}>
              <n.icon className="h-4 w-4" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-semibold">{n.title}</p>
                <span className="shrink-0 text-[11px] text-muted-foreground">{n.time}</span>
              </div>
              <p className="mt-0.5 text-xs text-muted-foreground">{n.body}</p>
            </div>
          </div>
        ))}
      </div>
    </OwnerShell>
  );
}
