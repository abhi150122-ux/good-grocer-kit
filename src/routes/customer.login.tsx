import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Smartphone, ShieldCheck, ArrowRight } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { BrandLogo } from "@/components/BrandLogo";

export const Route = createFileRoute("/customer/login")({ component: Login });

function Login() {
  const [phone, setPhone] = useState("98765 43210");
  const valid = phone.replace(/\D/g, "").length >= 10;
  return (
    <MobileFrame>
      <div className="relative flex flex-1 flex-col overflow-hidden">
        {/* soft brand backdrop */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-gradient-to-b from-primary-soft via-primary-soft/40 to-transparent" />
        <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-primary/20 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 top-32 h-56 w-56 rounded-full bg-accent/40 blur-3xl" />

        <div className="relative flex flex-1 flex-col px-6 pt-10">
          <div className="flex justify-center">
            <BrandLogo size="lg" />
          </div>

          <div className="mt-10">
            <h1 className="text-[28px] font-black leading-tight tracking-tight">Welcome</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Sign in with your mobile number to start shopping fresh groceries delivered to your door.
            </p>
          </div>

          {/* Card */}
          <div className="mt-6 rounded-3xl border bg-card/95 p-5 shadow-card backdrop-blur">
            <label className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
              Mobile number
            </label>
            <div className="mt-2 flex items-center gap-3 rounded-2xl border bg-background px-4 py-3.5 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
              <span className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-primary-soft text-primary">
                <Smartphone className="h-4 w-4" />
              </span>
              <span className="text-sm font-semibold text-foreground">+91</span>
              <span className="h-6 w-px bg-border" />
              <input
                inputMode="numeric"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="flex-1 bg-transparent text-base font-medium outline-none placeholder:text-muted-foreground"
                placeholder="00000 00000"
              />
            </div>

            <Link
              to="/customer/otp"
              aria-disabled={!valid}
              className={
                "mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold shadow-card transition active:scale-[0.98] " +
                (valid ? "bg-primary text-primary-foreground" : "pointer-events-none bg-muted text-muted-foreground")
              }
            >
              Send OTP <ArrowRight className="h-4 w-4" />
            </Link>

            <div className="mt-4 flex items-center gap-2 text-[11px] text-muted-foreground">
              <ShieldCheck className="h-3.5 w-3.5 text-primary" />
              Secure OTP verification. We'll never share your number.
            </div>
          </div>

          <div className="my-6 flex items-center gap-3 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
            <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
          </div>

          <Link
            to="/customer/register"
            className="grid h-12 w-full place-items-center rounded-2xl border border-primary/30 bg-card text-sm font-bold text-primary"
          >
            Create a new account
          </Link>

          <p className="mt-auto py-6 text-center text-[11px] leading-relaxed text-muted-foreground">
            By continuing you agree to Ghar Kart's{" "}
            <span className="font-semibold text-foreground">Terms</span> &{" "}
            <span className="font-semibold text-foreground">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}
