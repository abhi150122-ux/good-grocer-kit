import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section } from "@/components/PublicSite";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

export const Route = createFileRoute("/default-pages/contact")({
  head: () => ({
    meta: [
      { title: "Contact Us — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Contact Sri Gopal Khadya Bhandaar for orders, delivery queries and bulk enquiries in Ranchi." },
    ],
  }),
  component: Contact,
});

function Contact() {
  return (
    <PublicSite>
      <PageHero
        eyebrow="Get in touch"
        title="We're here to help with your order."
        subtitle="Reach out for order queries, delivery updates or bulk enquiries. Our team responds within store hours."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            <Card icon={MapPin} title="Store address" lines={["Kantatoli, Ranchi", "Jharkhand 834001, India"]} />
            <Card icon={Phone} title="Phone" lines={["+91 98765 43210"]} />
            <Card icon={MessageCircle} title="WhatsApp" lines={["+91 98765 43210"]} />
            <Card icon={Mail} title="Email" lines={["care@srigopalkhadya.in"]} />
            <Card icon={Clock} title="Store hours" lines={["Monday to Sunday", "7:00 AM – 9:00 PM"]} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); }}
            className="rounded-3xl border bg-card p-6 shadow-soft md:p-8"
          >
            <h2 className="text-xl font-bold tracking-tight">Send us a message</h2>
            <p className="mt-1 text-sm text-muted-foreground">We'll get back to you as soon as possible.</p>
            <div className="mt-5 space-y-4">
              <Field label="Full name" placeholder="Your name" />
              <Field label="Phone" placeholder="+91 ..." />
              <Field label="Pincode" placeholder="e.g. 834001" />
              <div>
                <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Message</label>
                <textarea
                  rows={4}
                  placeholder="How can we help?"
                  className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary/20 focus:ring-2"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-soft"
              >
                Send message
              </button>
            </div>
          </form>
        </div>
      </Section>
    </PublicSite>
  );
}

function Card({ icon: Icon, title, lines }: { icon: any; title: string; lines: string[] }) {
  return (
    <div className="flex items-start gap-3 rounded-2xl border bg-card p-5 shadow-soft">
      <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
        <Icon className="h-5 w-5" />
      </div>
      <div>
        <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">{title}</p>
        {lines.map((l) => <p key={l} className="text-sm font-semibold">{l}</p>)}
      </div>
    </div>
  );
}

function Field({ label, placeholder }: { label: string; placeholder: string }) {
  return (
    <div>
      <label className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{label}</label>
      <input
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border bg-background px-4 py-3 text-sm outline-none ring-primary/20 focus:ring-2"
      />
    </div>
  );
}
