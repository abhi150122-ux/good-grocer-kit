import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section } from "@/components/PublicSite";

export const Route = createFileRoute("/default-pages/refund-policy")({
  head: () => ({
    meta: [
      { title: "Refund Policy — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Refund and return policy for orders placed with Sri Gopal Khadya Bhandaar." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Refund,
});

function Refund() {
  return (
    <PublicSite>
      <PageHero eyebrow="Legal" title="Refund Policy" subtitle="Our commitment to fair refunds on eligible orders." />
      <Section>
        <article className="max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
          <Block title="Eligibility for refund">
            Refunds are offered for damaged, expired or incorrect items delivered by us. Please raise a
            complaint at the time of delivery or within 24 hours of receiving your order.
          </Block>
          <Block title="Non-refundable items">
            Perishable items that have been opened or partially consumed are not eligible for refund
            unless there is a clear quality issue.
          </Block>
          <Block title="How refunds are processed">
            Once your complaint is verified, refunds are processed within 5–7 working days to the
            original mode of payment. For cash-on-delivery orders, refunds may be issued via UPI or as
            store credit against your next purchase.
          </Block>
          <Block title="Order cancellation">
            You may cancel an order before it is packed for delivery by calling the store. Once an order
            is out for delivery, cancellations are not accepted.
          </Block>
          <Block title="Raise a request">
            For refund or cancellation requests, please call +91 98765 43210 or email
            care@srigopalkhadya.in with your order details.
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
