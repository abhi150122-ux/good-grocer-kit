import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section, serviceAreas } from "@/components/PublicSite";
import { Truck, MapPin, Wallet, Clock } from "lucide-react";

export const Route = createFileRoute("/default-pages/delivery")({
  head: () => ({
    meta: [
      { title: "Delivery Information — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Delivery charges, free delivery rules and service pincodes across Ranchi for Sri Gopal Khadya Bhandaar." },
    ],
  }),
  component: Delivery,
});

function Delivery() {
  return (
    <PublicSite>
      <PageHero
        eyebrow="Delivery"
        title="Fast, reliable delivery across Ranchi."
        subtitle="Free delivery on orders above ₹149. See our service areas and delivery rules below."
      />

      <Section className="space-y-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <InfoCard icon={Wallet} title="Delivery charges" value="On orders below ₹149" note="Nominal delivery charge applies." />
          <InfoCard icon={Truck} title="Free delivery" value="On orders above ₹149" note="No delivery charge. No hidden fees." />
          <InfoCard icon={Clock} title="Delivery time" value="Same-day / next-day" note="Within our Ranchi service areas." />
          <InfoCard icon={MapPin} title="Service areas" value={`${serviceAreas.length} pincodes`} note="Ranchi city and nearby Mandar." />
        </div>

        <div className="rounded-3xl border bg-card p-6 shadow-soft md:p-10">
          <h2 className="text-xl font-bold tracking-tight md:text-2xl">Serviceable pincodes</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            We currently deliver to the following areas in and around Ranchi, Jharkhand.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border">
            <div className="hidden grid-cols-12 border-b bg-secondary/60 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground sm:grid">
              <div className="col-span-5">Area</div>
              <div className="col-span-3">City</div>
              <div className="col-span-2">State</div>
              <div className="col-span-2 text-right">Pincode</div>
            </div>
            {serviceAreas.map((a) => (
              <div key={a.pin} className="grid grid-cols-12 items-center gap-2 border-b bg-card px-5 py-4 last:border-b-0">
                <div className="col-span-12 sm:col-span-5">
                  <p className="text-sm font-semibold">{a.area}</p>
                  <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">{a.city}, {a.state} · {a.pin}</p>
                </div>
                <div className="col-span-6 hidden text-sm text-muted-foreground sm:block sm:col-span-3">{a.city}</div>
                <div className="col-span-6 hidden text-sm text-muted-foreground sm:block sm:col-span-2">{a.state}</div>
                <div className="col-span-12 flex justify-start sm:col-span-2 sm:justify-end">
                  <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{a.pin}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            Don't see your area? Call us — we're constantly expanding our delivery network in Ranchi.
          </p>
        </div>
      </Section>
    </PublicSite>
  );
}

function InfoCard({ icon: Icon, title, value, note }: { icon: any; title: string; value: string; note: string }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <p className="mt-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
      <p className="mt-1 text-base font-bold">{value}</p>
      <p className="mt-1 text-xs text-muted-foreground">{note}</p>
    </div>
  );
}
