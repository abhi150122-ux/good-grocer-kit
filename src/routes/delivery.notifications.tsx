import { createFileRoute } from "@tanstack/react-router";
import { DeliveryShell, DeliveryHeader } from "@/components/DeliveryShell";
import { Package, MapPin, Check, IndianRupee, AlertTriangle, Bike } from "lucide-react";

export const Route = createFileRoute("/delivery/notifications")({ component: DeliveryNotifs });

const items = [
  { icon: Package, tone: "info", title: "New order assigned", body: "Pick up order #ORD2041 from FreshCart Koramangala.", time: "Just now" },
  { icon: MapPin, tone: "info", title: "Route updated", body: "Customer changed address for order #ORD2040. Tap to see new route.", time: "8 min ago" },
  { icon: Check, tone: "success", title: "Delivery completed", body: "Great job! Order #ORD2039 was delivered successfully.", time: "1h ago" },
  { icon: IndianRupee, tone: "success", title: "Earnings credited", body: "₹420 added to your wallet for today's deliveries.", time: "3h ago" },
  { icon: AlertTriangle, tone: "warning", title: "Cash collection", body: "Remember to collect ₹620 (COD) for order #ORD2040.", time: "Yesterday" },
  { icon: Bike, tone: "neutral", title: "Shift reminder", body: "Your evening shift starts in 1 hour. Mark yourself online.", time: "Yesterday" },
] as const;

function DeliveryNotifs() {
  const tones = {
    info: "bg-primary-soft text-primary",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    neutral: "bg-secondary text-secondary-foreground",
  } as const;
  return (
    <DeliveryShell>
      <DeliveryHeader title="Notifications" subtitle="Updates" />
      <div className="space-y-2 p-4">
        <div className="rounded-2xl border bg-gradient-to-r from-primary-soft to-accent/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">Live updates</p>
          <p className="mt-1 text-sm">New assignments, route changes and earnings appear here.</p>
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
    </DeliveryShell>
  );
}
