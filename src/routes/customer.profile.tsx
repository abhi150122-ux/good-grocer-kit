import { createFileRoute, Link } from "@tanstack/react-router";
import { CustomerShell } from "@/components/CustomerShell";
import { PageHeader } from "@/components/ui-bits";
import { ChevronRight, MapPin, CreditCard, Bell, HelpCircle, LogOut, Heart, Gift, FileText } from "lucide-react";

export const Route = createFileRoute("/customer/profile")({ component: Profile });

const sections = [
  {
    title: "Account",
    items: [
      { icon: MapPin, label: "Saved addresses", to: "/customer/addresses" as const },
      { icon: CreditCard, label: "Payment methods", to: "/customer/profile" as const },
      { icon: Heart, label: "Favorites", to: "/customer/profile" as const },
    ],
  },
  {
    title: "Activity",
    items: [
      { icon: Gift, label: "Refer & earn", to: "/customer/profile" as const },
      { icon: FileText, label: "Coupons & rewards", to: "/customer/profile" as const },
      { icon: Bell, label: "Notifications", to: "/customer/notifications" as const },
    ],
  },
  {
    title: "Support",
    items: [
      { icon: HelpCircle, label: "Help center", to: "/customer/profile" as const },
      { icon: LogOut, label: "Sign out", to: "/customer/welcome" as const },
    ],
  },
];

function Profile() {
  return (
    <CustomerShell>
      <PageHeader title="My profile" back={false} right={<Link to="/customer/edit-profile" className="text-xs font-semibold text-primary">Edit</Link>} />
      <div className="bg-gradient-to-b from-primary-soft to-background px-5 pb-6 pt-4">
        <div className="flex items-center gap-4">
          <div className="grid h-16 w-16 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground shadow-soft">
            AS
          </div>
          <div>
            <p className="text-lg font-bold">Aarav Sharma</p>
            <p className="text-xs text-muted-foreground">+91 98765 43210 · aarav@example.com</p>
          </div>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-2 rounded-2xl border bg-card p-3 shadow-soft text-center">
          <Stat n="14" label="Orders" />
          <Stat n="₹8.4k" label="Spent" />
          <Stat n="4" label="Saved" />
        </div>
      </div>

      <div className="space-y-5 px-5 pb-6">
        {sections.map((s) => (
          <div key={s.title}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{s.title}</p>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
              {s.items.map((it, i) => (
                <Link
                  key={it.label}
                  to={it.to}
                  className={"flex items-center gap-3 px-4 py-3.5 " + (i > 0 ? "border-t" : "")}
                >
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><it.icon className="h-4 w-4" /></div>
                  <span className="flex-1 text-sm font-medium">{it.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>
        ))}
        <p className="text-center text-xs text-muted-foreground">FreshCart · v1.0.0</p>
      </div>
    </CustomerShell>
  );
}

function Stat({ n, label }: { n: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold">{n}</p>
      <p className="text-[11px] text-muted-foreground">{label}</p>
    </div>
  );
}
