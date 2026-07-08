import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section } from "@/components/PublicSite";

export const Route = createFileRoute("/default-pages/terms")({
  head: () => ({
    meta: [
      { title: "Terms & Conditions — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Terms and conditions governing the use of Sri Gopal Khadya Bhandaar's grocery delivery service." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Terms,
});

function Terms() {
  return (
    <PublicSite>
      <PageHero eyebrow="Legal" title="Terms & Conditions" subtitle="Please read these terms carefully before placing an order." />
      <Section>
        <article className="max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
          <Block title="Acceptance of terms">
            By placing an order with Sri Gopal Khadya Bhandaar (GSTIN 20AFKFS5547K1ZP), you agree to be
            bound by these terms and conditions.
          </Block>
          <Block title="Orders & pricing">
            All product prices are listed in Indian Rupees (₹) and are subject to change without notice.
            Order confirmation is subject to stock availability. We reserve the right to cancel any order
            in case of stock shortage or pricing errors.
          </Block>
          <Block title="Delivery">
            Delivery is available only within our serviceable pincodes in Ranchi and nearby areas.
            Delivery timelines are indicative and may vary based on demand, weather or other factors.
          </Block>
          <Block title="Payments">
            We accept cash on delivery and UPI-based payments as available. Full payment is required at
            or before delivery.
          </Block>
          <Block title="Product quality">
            We stock trusted brands and inspect stock before delivery. Any concerns regarding product
            quality should be reported at the time of delivery or within 24 hours.
          </Block>
          <Block title="Limitation of liability">
            Sri Gopal Khadya Bhandaar is not liable for any indirect or consequential loss arising from
            delayed delivery or product unavailability beyond our control.
          </Block>
          <Block title="Governing law">
            These terms are governed by the laws of India, and disputes shall be subject to the
            jurisdiction of courts in Ranchi, Jharkhand.
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
