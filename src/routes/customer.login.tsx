import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Phone } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/customer/login")({ component: Login });

function Login() {
  const [phone, setPhone] = useState("98765 43210");
  const valid = phone.replace(/\D/g, "").length >= 10;
  return (
    <MobileFrame>
      <PageHeader title="Sign in" back="/customer/welcome" />
      <div className="flex flex-1 flex-col px-6 pt-6">
        <h2 className="text-2xl font-bold tracking-tight">Enter your mobile number</h2>
        <p className="mt-1 text-sm text-muted-foreground">We'll send you a one-time password to verify.</p>

        <label className="mt-8 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
          Mobile number
        </label>
        <div className="mt-2 flex items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-soft focus-within:ring-2 focus-within:ring-primary/40">
          <span className="flex items-center gap-1 border-r border-border pr-3 text-sm font-semibold">
            <Phone className="h-4 w-4 text-muted-foreground" /> +91
          </span>
          <input
            inputMode="numeric"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="flex-1 bg-transparent text-base outline-none"
            placeholder="98765 43210"
          />
        </div>

        <Link
          to="/customer/otp"
          aria-disabled={!valid}
          className={
            "mt-8 grid h-12 w-full place-items-center rounded-full text-sm font-semibold shadow-card transition " +
            (valid ? "bg-primary text-primary-foreground" : "pointer-events-none bg-muted text-muted-foreground")
          }
        >
          Continue
        </Link>

        <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-border" />
          or
          <div className="h-px flex-1 bg-border" />
        </div>

        <button className="mt-6 grid h-12 w-full place-items-center rounded-full border bg-card text-sm font-semibold">
          Continue as guest
        </button>

        <p className="mt-auto py-6 text-center text-xs text-muted-foreground">
          New to FreshCart? An account will be created automatically.
        </p>
      </div>
    </MobileFrame>
  );
}
