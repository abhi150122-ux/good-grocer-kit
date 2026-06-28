import { Link, useRouterState } from "@tanstack/react-router";
import { Bike, ClipboardList, History, User, Bell } from "lucide-react";
import { MobileFrame } from "./MobileFrame";
import type { ReactNode } from "react";

const items = [
  { to: "/delivery/orders", icon: ClipboardList, label: "Orders" },
  { to: "/delivery/history", icon: History, label: "History" },
  { to: "/delivery/notifications", icon: Bell, label: "Alerts" },
  { to: "/delivery/profile", icon: User, label: "Profile" },
] as const;

export function DeliveryShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto pb-24">{children}</main>
        <nav className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t border-border/60 bg-card/95 px-2 py-2 backdrop-blur md:rounded-b-[2.5rem]">
          <ul className="flex items-center justify-between">
            {items.map((it) => {
              const active = path.startsWith(it.to);
              return (
                <li key={it.to} className="flex-1">
                  <Link to={it.to} className={"flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition " + (active ? "text-primary" : "text-muted-foreground")}>
                    <span className={"grid h-9 w-9 place-items-center rounded-xl transition " + (active ? "bg-primary text-primary-foreground shadow-soft" : "")}>
                      <it.icon className="h-[18px] w-[18px]" />
                    </span>
                    {it.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </MobileFrame>
  );
}

export function DeliveryHeader({ title, subtitle, right }: { title: string; subtitle?: string; right?: ReactNode }) {
  return (
    <header className="bg-gradient-to-b from-primary to-primary/80 px-5 pb-6 pt-6 text-primary-foreground">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-primary-foreground/15"><Bike className="h-5 w-5" /></div>
          <div>
            <p className="text-xs uppercase tracking-wide opacity-80">{subtitle ?? "Partner"}</p>
            <p className="text-base font-bold leading-none">{title}</p>
          </div>
        </div>
        {right}
      </div>
    </header>
  );
}
