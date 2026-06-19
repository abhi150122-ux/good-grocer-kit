import { createFileRoute, Link } from "@tanstack/react-router";
import { Bike, Lock, User } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/delivery/")({ component: Login });

function Login() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col bg-gradient-to-b from-primary to-primary/70 px-6 pt-16 text-primary-foreground">
        <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary-foreground/15"><Bike className="h-10 w-10" /></div>
        <h1 className="mt-8 text-3xl font-bold tracking-tight">Welcome back</h1>
        <p className="mt-1 text-sm opacity-90">Sign in to your delivery partner account</p>

        <div className="mt-10 space-y-3">
          <div className="flex items-center gap-3 rounded-2xl bg-primary-foreground/15 px-4 py-3.5">
            <User className="h-4 w-4" />
            <input defaultValue="+91 90111 22233" className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary-foreground/60" />
          </div>
          <div className="flex items-center gap-3 rounded-2xl bg-primary-foreground/15 px-4 py-3.5">
            <Lock className="h-4 w-4" />
            <input type="password" defaultValue="••••••••" className="flex-1 bg-transparent text-sm outline-none placeholder:text-primary-foreground/60" />
          </div>
        </div>

        <Link to="/delivery/orders" className="mt-8 grid h-12 w-full place-items-center rounded-full bg-primary-foreground text-sm font-semibold text-primary shadow-pop">
          Sign in
        </Link>
        <p className="mt-3 text-center text-xs opacity-80">Forgot password? Contact your admin.</p>
      </div>
    </MobileFrame>
  );
}
