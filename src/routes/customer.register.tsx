import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { User, Smartphone, Mail, ArrowRight, ShieldCheck } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";
import { BrandLogo } from "@/components/BrandLogo";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/customer/register")({ component: Register });

function Register() {
  const [name, setName] = useState("Aarav Sharma");
  const [phone, setPhone] = useState("98765 43210");
  const [email, setEmail] = useState("aarav@example.com");
  const valid = name.trim().length > 1 && phone.replace(/\D/g, "").length >= 10;

  return (
    <MobileFrame>
      <PageHeader title="Create account" back="/customer/login" />
      <div className="relative flex flex-1 flex-col overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-56 bg-gradient-to-b from-primary-soft/70 to-transparent" />
        <div className="pointer-events-none absolute -right-16 top-10 h-48 w-48 rounded-full bg-accent/40 blur-3xl" />

        <div className="relative flex flex-1 flex-col px-6 pt-6">
          <div className="flex justify-center">
            <BrandLogo size="md" />
          </div>

          <div className="mt-6">
            <h1 className="text-[26px] font-black leading-tight tracking-tight">Welcome to GharKart</h1>
            <p className="mt-1.5 text-sm text-muted-foreground">
              Tell us a bit about you so we can personalise your grocery experience.
            </p>
          </div>

          <div className="mt-6 space-y-3 rounded-3xl border bg-card/95 p-5 shadow-card">
            <Field
              label="Full name"
              icon={<User className="h-4 w-4" />}
              value={name}
              onChange={setName}
              placeholder="Your name"
            />
            <Field
              label="Mobile number"
              icon={<Smartphone className="h-4 w-4" />}
              value={phone}
              onChange={setPhone}
              placeholder="98765 43210"
              inputMode="numeric"
              prefix="+91"
            />
            <Field
              label="Email (optional)"
              icon={<Mail className="h-4 w-4" />}
              value={email}
              onChange={setEmail}
              placeholder="you@example.com"
              type="email"
            />
          </div>

          <Link
            to="/customer/otp"
            aria-disabled={!valid}
            className={
              "mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl text-sm font-bold shadow-card transition active:scale-[0.98] " +
              (valid ? "bg-primary text-primary-foreground" : "pointer-events-none bg-muted text-muted-foreground")
            }
          >
            Create account <ArrowRight className="h-4 w-4" />
          </Link>

          <div className="mt-4 flex items-center justify-center gap-2 text-[11px] text-muted-foreground">
            <ShieldCheck className="h-3.5 w-3.5 text-primary" />
            Your details are safe & encrypted.
          </div>

          <p className="mt-auto py-6 text-center text-xs text-muted-foreground">
            Already have an account?{" "}
            <Link to="/customer/login" className="font-bold text-primary">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </MobileFrame>
  );
}

function Field({
  label, icon, value, onChange, placeholder, inputMode, type, prefix,
}: {
  label: string;
  icon: React.ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  inputMode?: "text" | "numeric" | "email";
  type?: string;
  prefix?: string;
}) {
  return (
    <label className="block">
      <span className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">{label}</span>
      <div className="mt-1.5 flex items-center gap-3 rounded-2xl border bg-background px-3.5 py-3 transition focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/15">
        <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-primary-soft text-primary">{icon}</span>
        {prefix && <><span className="text-sm font-semibold">{prefix}</span><span className="h-5 w-px bg-border" /></>}
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          inputMode={inputMode}
          type={type}
          className="flex-1 bg-transparent text-sm font-medium outline-none placeholder:text-muted-foreground"
        />
      </div>
    </label>
  );
}
