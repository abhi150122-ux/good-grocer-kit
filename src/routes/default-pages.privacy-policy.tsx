import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section } from "@/components/PublicSite";

export const Route = createFileRoute("/default-pages/privacy-policy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Privacy policy describing how Sri Gopal Khadya Bhandaar collects and uses customer information." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Policy,
});

function Policy() {
  return (
    <PublicSite>
      <PageHero eyebrow="Legal" title="Privacy Policy" subtitle="This page is maintained by Sri Gopal Khadya Bhandaar to explain how we handle your information." />
      <Section>
        <article className="prose prose-sm max-w-3xl space-y-5 text-sm leading-relaxed text-muted-foreground">
          <Block title="Information we collect">
            We collect information you provide while placing an order — name, phone number, delivery
            address and pincode. This information is used solely to process and deliver your order.
          </Block>
          <Block title="How we use your information">
            Your details are used to confirm orders, coordinate delivery, send order updates over call
            or SMS/WhatsApp, and provide customer support.
          </Block>
          <Block title="Sharing of information">
            We do not sell or rent your personal information. Delivery partners receive only the details
            needed to complete your order.
          </Block>
          <Block title="Data retention">
            Order records are retained for accounting and statutory compliance as required under
            applicable Indian law, including GST regulations.
          </Block>
          <Block title="Your choices">
            You may request updates or deletion of your personal information by contacting us at
            care@srigopalkhadya.in. Certain records may be retained where required by law.
          </Block>
          <Block title="Contact">
            For any privacy-related questions please reach out to Sri Gopal Khadya Bhandaar, Kantatoli,
            Ranchi, Jharkhand 834001 or email care@srigopalkhadya.in.
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
