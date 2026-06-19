import { createFileRoute } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { Check, Bike, Package, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/customer/notifications")({ component: Notifications });

const items = [
  { icon: Check, tone: "success", title: "Order delivered", body: "Your order #ORD2039 was delivered. Rate your experience.", time: "2h ago", channel: "WhatsApp" },
  { icon: Bike, tone: "info", title: "Delivery partner assigned", body: "Ravi Kumar is on the way with your order #ORD2041.", time: "12 min ago", channel: "WhatsApp" },
  { icon: Package, tone: "warning", title: "Order placed", body: "We've received your order #ORD2042. We'll start packing soon.", time: "1 min ago", channel: "WhatsApp" },
  { icon: MessageCircle, tone: "neutral", title: "Weekend offer", body: "Get 20% off on all fruits this weekend. Use code FRESH20.", time: "Yesterday", channel: "Promotional" },
] as const;

function Notifications() {
  return (
    <MobileFrame>
      <PageHeader title="Notifications" back="/customer/profile" />
      <div className="space-y-3 p-4">
        <div className="rounded-2xl border bg-gradient-to-r from-primary-soft to-accent/40 p-4">
          <p className="text-xs font-semibold uppercase tracking-wide text-primary">WhatsApp updates</p>
          <p className="mt-1 text-sm">You'll get instant order updates on your WhatsApp number.</p>
        </div>

        {items.map((n, i) => {
          const tones = {
            success: "bg-success/15 text-success",
            info: "bg-primary-soft text-primary",
            warning: "bg-warning/15 text-warning-foreground",
            neutral: "bg-secondary text-secondary-foreground",
          } as const;
          return (
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
                <span className="mt-2 inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold text-muted-foreground">{n.channel}</span>
              </div>
            </div>
          );
        })}
      </div>
    </MobileFrame>
  );
}
