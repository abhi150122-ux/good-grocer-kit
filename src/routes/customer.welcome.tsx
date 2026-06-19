import { createFileRoute, Link } from "@tanstack/react-router";
import { ShoppingBasket, Clock, ShieldCheck } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/customer/welcome")({ component: Welcome });

function Welcome() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col bg-gradient-to-b from-primary-soft to-background px-6 pt-12">
        <div className="grid h-64 place-items-center">
          <div className="relative">
            <div className="absolute inset-0 animate-pulse rounded-full bg-primary/20 blur-3xl" />
            <div className="relative grid h-44 w-44 place-items-center rounded-[2rem] bg-primary text-primary-foreground shadow-pop">
              <ShoppingBasket className="h-20 w-20" />
            </div>
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Fresh groceries, delivered to your door.</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Order daily essentials, fruits, vegetables and more — delivered fast and fresh in your neighborhood.
        </p>

        <ul className="mt-6 space-y-3">
          {[
            { icon: Clock, title: "Lightning fast", desc: "Delivered in 30 minutes" },
            { icon: ShieldCheck, title: "Quality assured", desc: "Hand-picked, fresh stock" },
          ].map((f) => (
            <li key={f.title} className="flex items-center gap-3 rounded-2xl border bg-card p-3 shadow-soft">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-soft text-primary">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-semibold">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-auto pb-8 pt-6">
          <Link
            to="/customer/login"
            className="grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card"
          >
            Get started
          </Link>
          <p className="mt-3 text-center text-xs text-muted-foreground">
            By continuing you agree to our <span className="font-medium text-foreground">Terms</span> &{" "}
            <span className="font-medium text-foreground">Privacy</span>.
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}
