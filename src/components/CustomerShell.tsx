import { Link, useRouterState } from "@tanstack/react-router";
import { Home, Search, ShoppingCart, ClipboardList, User } from "lucide-react";
import { MobileFrame } from "./MobileFrame";
import type { ReactNode } from "react";

const items = [
  { to: "/customer/home", icon: Home, label: "Home" },
  { to: "/customer/search", icon: Search, label: "Search" },
  { to: "/customer/cart", icon: ShoppingCart, label: "Cart" },
  { to: "/customer/orders", icon: ClipboardList, label: "Orders" },
  { to: "/customer/profile", icon: User, label: "Profile" },
] as const;

export function CustomerShell({ children }: { children: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <MobileFrame>
      <div className="relative flex flex-1 flex-col">
        <main className="flex-1 overflow-y-auto pb-24">{children}</main>
        <nav className="absolute bottom-0 left-1/2 z-20 w-full max-w-[440px] -translate-x-1/2 border-t border-border/60 bg-card/95 px-2 py-2 backdrop-blur md:rounded-b-[2.5rem]">
          <ul className="flex items-center justify-between">
            {items.map((it) => {
              const active = path === it.to || (it.to === "/customer/orders" && path.startsWith("/customer/orders"));
              return (
                <li key={it.to} className="flex-1">
                  <Link
                    to={it.to}
                    className={
                      "flex flex-col items-center gap-1 rounded-xl py-2 text-[11px] font-medium transition " +
                      (active ? "text-primary" : "text-muted-foreground")
                    }
                  >
                    <span
                      className={
                        "grid h-9 w-9 place-items-center rounded-xl transition " +
                        (active ? "bg-primary text-primary-foreground shadow-soft" : "")
                      }
                    >
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
