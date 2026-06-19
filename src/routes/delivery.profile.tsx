import { createFileRoute, Link } from "@tanstack/react-router";
import { DeliveryShell, DeliveryHeader } from "@/components/DeliveryShell";
import { ChevronRight, Phone, Star, LogOut, Bike, Bell, Settings } from "lucide-react";

export const Route = createFileRoute("/delivery/profile")({ component: Profile });

function Profile() {
  return (
    <DeliveryShell>
      <DeliveryHeader title="Ravi Kumar" subtitle="Active partner" />
      <div className="-mt-4 px-4">
        <div className="grid grid-cols-3 gap-2 rounded-2xl border bg-card p-4 shadow-card text-center">
          <Stat n="124" label="Deliveries" />
          <Stat n="4.8" label="Rating" />
          <Stat n="98%" label="On time" />
        </div>
      </div>

      <div className="space-y-4 px-4 pt-6 pb-6">
        {[
          { title: "Account", items: [
            { icon: Bike, label: "Vehicle · KA01 AB1234" },
            { icon: Phone, label: "+91 90111 22233" },
            { icon: Star, label: "Ratings & feedback" },
          ]},
          { title: "Preferences", items: [
            { icon: Bell, label: "Notifications" },
            { icon: Settings, label: "App settings" },
          ]},
        ].map((g) => (
          <div key={g.title}>
            <p className="mb-2 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{g.title}</p>
            <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
              {g.items.map((it, i) => (
                <button key={it.label} className={"flex w-full items-center gap-3 px-4 py-3.5 text-left " + (i > 0 ? "border-t" : "")}>
                  <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary-soft text-primary"><it.icon className="h-4 w-4" /></div>
                  <span className="flex-1 text-sm font-medium">{it.label}</span>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ))}

        <Link to="/delivery" className="flex items-center justify-center gap-2 rounded-2xl border border-destructive/40 bg-card py-3 text-sm font-semibold text-destructive">
          <LogOut className="h-4 w-4" /> Sign out
        </Link>
      </div>
    </DeliveryShell>
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
