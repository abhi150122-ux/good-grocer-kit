import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section, serviceAreas } from "@/components/PublicSite";

export const Route = createFileRoute("/default-pages/shipping-policy")({
  head: () => ({
    meta: [
      { title: "Shipping Policy — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Shipping charges, delivery timelines and serviceable pincodes for Sri Gopal Khadya Bhandaar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Shipping,
});

function Shipping() {
  return (
    <PublicSite>
      <PageHero eyebrow="Legal" title="Shipping Policy" subtitle="Delivery charges, timelines and coverage across Ranchi." />
      <Section>
        <article className="max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
          <Block title="Delivery charges">
            A nominal delivery charge applies to orders below ₹149. Orders of ₹149 and above qualify for
            free delivery within our service areas.
          </Block>
          <Block title="Delivery timelines">
            Orders are typically dispatched the same day and delivered on the same or next day, depending
            on the time of order and delivery area. Timings may vary during peak demand, festivals or
            weather disruptions.
          </Block>
          <Block title="Serviceable pincodes">
            We currently deliver to the following areas in and around Ranchi, Jharkhand:
          </Block>

          <div className="not-prose overflow-hidden rounded-2xl border bg-card">
            {serviceAreas.map((a) => (
              <div key={a.pin} className="flex items-center justify-between border-b px-4 py-3 last:border-b-0 text-sm">
                <div>
                  <p className="font-semibold text-foreground">{a.area}</p>
                  <p className="text-xs text-muted-foreground">{a.city}, {a.state}</p>
                </div>
                <span className="rounded-full bg-primary-soft px-3 py-1 text-xs font-bold text-primary">{a.pin}</span>
              </div>
            ))}
          </div>

          <Block title="Non-delivery">
            If our delivery partner is unable to reach you or the address is inaccessible, we will try
            once more or contact you to reschedule. Repeated failed attempts may result in cancellation.
          </Block>
          <Block title="Contact">
            For any shipping-related queries, please contact us at +91 98765 43210 or
            care@srigopalkhadya.in.
          </Block>
        </article>
      </Section>
    </PublicSite>
  );
}

function Block({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="text-base font-bold text-foreground">{title}</h2>
      <p className="mt-2">{children}</p>
    </section>
  );
}
