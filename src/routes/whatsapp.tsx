import { createFileRoute, Link } from "@tanstack/react-router";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { ArrowLeft, Phone, Video, MoreVertical, Check, CheckCheck } from "lucide-react";

export const Route = createFileRoute("/whatsapp")({
  head: () => ({
    meta: [
      { title: "WhatsApp notification preview · FreshCart" },
      { name: "description", content: "Preview WhatsApp notification templates for customers, vendors and delivery partners." },
    ],
  }),
  component: Whatsapp,
});

const templates = [
  {
    audience: "Customer",
    color: "bg-success/15 text-success",
    msgs: [
      { kind: "header", text: "🛒 Order placed" },
      { kind: "body", text: "Hi Aarav! Your FreshCart order #ORD2042 for ₹1,248 has been received. We'll start packing right away." },
      { kind: "cta", text: "View order" },
    ],
  },
  {
    audience: "Customer",
    color: "bg-primary-soft text-primary",
    msgs: [
      { kind: "header", text: "🚴 Delivery partner assigned" },
      { kind: "body", text: "Ravi Kumar is on the way with your order #ORD2041. ETA 22 mins. Call +91 90111 22233 if needed." },
      { kind: "cta", text: "Track order" },
    ],
  },
  {
    audience: "Customer",
    color: "bg-chart-4/15 text-chart-4",
    msgs: [
      { kind: "header", text: "✅ Order delivered" },
      { kind: "body", text: "Your order #ORD2039 has been delivered. Hope you enjoy your fresh groceries! Tap below to rate your experience." },
      { kind: "cta", text: "Rate order" },
    ],
  },
  {
    audience: "Store owner",
    color: "bg-warning/15 text-warning-foreground",
    msgs: [
      { kind: "header", text: "📦 New order received" },
      { kind: "body", text: "New order #ORD2042 from Aarav Sharma · ₹1,248 · UPI. Please accept and start packing." },
      { kind: "cta", text: "Open admin panel" },
    ],
  },
  {
    audience: "Delivery partner",
    color: "bg-accent text-accent-foreground",
    msgs: [
      { kind: "header", text: "🛵 New order assigned" },
      { kind: "body", text: "Pickup ready for #ORD2041 → Koramangala 4th Block. Distance 2.4 km · ₹45 earning." },
      { kind: "cta", text: "Open delivery app" },
    ],
  },
];

function Whatsapp() {
  return (
    <MobileFrame>
      <header className="flex items-center gap-3 bg-[oklch(0.22_0.04_150)] px-3 py-3 text-white">
        <button><ArrowLeft className="h-5 w-5" /></button>
        <div className="grid h-10 w-10 place-items-center rounded-full bg-success text-success-foreground text-sm font-bold">FC</div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">FreshCart</p>
          <p className="text-[11px] opacity-70">online</p>
        </div>
        <Video className="h-5 w-5 opacity-80" />
        <Phone className="h-5 w-5 opacity-80" />
        <MoreVertical className="h-5 w-5 opacity-80" />
      </header>

      <main
        className="flex-1 overflow-y-auto px-3 py-4"
        style={{
          background:
            "repeating-linear-gradient(135deg, oklch(0.95 0.02 140) 0 2px, oklch(0.97 0.01 140) 2px 12px)",
        }}
      >
        <p className="mx-auto mb-4 w-fit rounded-full bg-card/90 px-3 py-1 text-[11px] text-muted-foreground shadow-soft">
          Today
        </p>

        {templates.map((t, i) => (
          <div key={i} className="mb-4">
            <span className={"mb-1.5 inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold " + t.color}>
              {t.audience} · template
            </span>
            <div className="relative ml-2 max-w-[88%] rounded-2xl rounded-tl-sm bg-card p-3 shadow-soft">
              {t.msgs.map((m, j) =>
                m.kind === "cta" ? (
                  <button key={j} className="mt-2 block w-full rounded-xl border-t border-border pt-2 text-sm font-semibold text-success">
                    {m.text}
                  </button>
                ) : m.kind === "header" ? (
                  <p key={j} className="text-sm font-bold">{m.text}</p>
                ) : (
                  <p key={j} className="mt-1 text-sm leading-relaxed">{m.text}</p>
                ),
              )}
              <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                10:24 AM <CheckCheck className="h-3 w-3 text-chart-4" />
              </div>
            </div>
          </div>
        ))}

        <div className="mt-4 ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-success/20 p-3 shadow-soft">
          <p className="text-sm">Thanks! Looking forward to it 👍</p>
          <div className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
            10:25 AM <Check className="h-3 w-3" />
          </div>
        </div>
      </main>

      <footer className="border-t bg-card p-3">
        <Link to="/" className="block text-center text-xs font-semibold text-primary">← Back to FreshCart overview</Link>
      </footer>
    </MobileFrame>
  );
}
