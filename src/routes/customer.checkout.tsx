import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MapPin, CreditCard, Banknote, QrCode, Check, ChevronRight } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";
import { addresses, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/checkout")({ component: Checkout });

function Checkout() {
  const [addr, setAddr] = useState(addresses[0].id);
  const [pay, setPay] = useState<"COD" | "UPI" | "CARD">("UPI");
  const subtotal = 1248;
  const delivery = 0;
  const total = subtotal + delivery;

  return (
    <MobileFrame>
      <PageHeader title="Checkout" back="/customer/cart" />
      <main className="flex-1 overflow-y-auto p-4 pb-32">
        <Section title="Delivery address" action={<Link to="/customer/addresses" className="text-xs font-semibold text-primary">Manage</Link>}>
          <div className="space-y-2">
            {addresses.map((a) => (
              <label key={a.id} className={"flex cursor-pointer gap-3 rounded-2xl border bg-card p-3 shadow-soft " + (addr === a.id ? "ring-2 ring-primary" : "")}>
                <input type="radio" name="addr" checked={addr === a.id} onChange={() => setAddr(a.id)} className="sr-only" />
                <div className={"mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full border-2 " + (addr === a.id ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                  {addr === a.id && <Check className="h-3 w-3" />}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{a.label}</p>
                    {a.default && <span className="rounded-full bg-primary-soft px-2 py-0.5 text-[10px] font-semibold text-primary">Default</span>}
                  </div>
                  <p className="mt-0.5 text-xs text-muted-foreground">{a.line}, {a.area}, {a.city}</p>
                </div>
              </label>
            ))}
            <Link to="/customer/add-address" className="flex items-center gap-2 rounded-2xl border-2 border-dashed p-3 text-sm font-semibold text-primary">
              <MapPin className="h-4 w-4" /> Add new address
            </Link>
          </div>
        </Section>

        <Section title="Delivery slot">
          <div className="grid grid-cols-3 gap-2">
            {["In 30 min", "Today 6 PM", "Tomorrow 10 AM"].map((t, i) => (
              <button key={t} className={"rounded-xl border bg-card p-3 text-xs font-semibold " + (i === 0 ? "border-primary bg-primary-soft text-primary" : "")}>
                {t}
              </button>
            ))}
          </div>
        </Section>

        <Section title="Payment method">
          <div className="space-y-2">
            {[
              { id: "UPI" as const, icon: QrCode, title: "Merchant UPI / QR", desc: "Scan and pay at delivery", tag: "Instant" },
              { id: "COD" as const, icon: Banknote, title: "Cash on delivery", desc: "Pay when you receive your order", tag: "Popular" },
              { id: "CARD" as const, icon: CreditCard, title: "Credit / Debit card", desc: "Visa, MasterCard, Rupay" },
            ].map((m) => (
              <label key={m.id} className={"flex cursor-pointer items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft " + (pay === m.id ? "ring-2 ring-primary" : "")}>
                <input type="radio" name="pay" checked={pay === m.id} onChange={() => setPay(m.id)} className="sr-only" />
                <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary"><m.icon className="h-5 w-5" /></div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold">{m.title}</p>
                    {m.tag && <span className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-semibold text-accent-foreground">{m.tag}</span>}
                  </div>
                  <p className="text-[11px] text-muted-foreground">{m.desc}</p>
                </div>
                <div className={"grid h-5 w-5 place-items-center rounded-full border-2 " + (pay === m.id ? "border-primary bg-primary text-primary-foreground" : "border-border")}>
                  {pay === m.id && <Check className="h-3 w-3" />}
                </div>
              </label>
            ))}
          </div>
        </Section>

        <Section title="Order summary" action={<Link to="/customer/cart" className="flex items-center text-xs font-semibold text-primary">Edit <ChevronRight className="h-3 w-3" /></Link>}>
          <div className="rounded-2xl border bg-card p-4 shadow-soft text-sm">
            <div className="flex justify-between text-muted-foreground"><span>Items (4)</span><span>{formatPrice(subtotal)}</span></div>
            <div className="mt-1.5 flex justify-between text-muted-foreground"><span>Delivery</span><span className="font-semibold text-success">FREE</span></div>
            <div className="my-3 h-px bg-border" />
            <div className="flex justify-between"><span className="font-semibold">Total payable</span><span className="text-base font-bold">{formatPrice(total)}</span></div>
          </div>
        </Section>
      </main>

      <div className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t bg-card/95 p-4 backdrop-blur md:rounded-b-[2.5rem]">
        <Link to="/customer/order-success" className="grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card">
          Place order · {formatPrice(total)}
        </Link>
      </div>
    </MobileFrame>
  );
}

function Section({ title, action, children }: { title: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="mb-5">
      <div className="mb-2 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">{title}</h2>
        {action}
      </div>
      {children}
    </section>
  );
}
