import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { MobileFrame } from "@/components/MobileFrame";
import { PageHeader } from "@/components/ui-bits";

export const Route = createFileRoute("/customer/otp")({ component: Otp });

function Otp() {
  const [otp, setOtp] = useState(["4", "8", "1", ""]);
  const filled = otp.every(Boolean);
  return (
    <MobileFrame>
      <PageHeader title="Verify OTP" back="/customer/login" />
      <div className="flex flex-1 flex-col px-6 pt-6">
        <h2 className="text-2xl font-bold tracking-tight">Enter verification code</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Sent to <span className="font-medium text-foreground">+91 98765 43210</span>
        </p>

        <div className="mt-10 flex justify-center gap-3">
          {otp.map((d, i) => (
            <input
              key={i}
              value={d}
              onChange={(e) => {
                const v = e.target.value.slice(-1).replace(/\D/g, "");
                const next = [...otp]; next[i] = v; setOtp(next);
              }}
              inputMode="numeric"
              maxLength={1}
              className="h-14 w-12 rounded-2xl border bg-card text-center text-xl font-bold shadow-soft outline-none focus:ring-2 focus:ring-primary/40"
            />
          ))}
        </div>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Didn't receive? <button className="font-semibold text-primary">Resend in 0:24</button>
        </p>

        <Link
          to="/customer/home"
          aria-disabled={!filled}
          className={
            "mt-10 grid h-12 w-full place-items-center rounded-full text-sm font-semibold shadow-card transition " +
            (filled ? "bg-primary text-primary-foreground" : "pointer-events-none bg-muted text-muted-foreground")
          }
        >
          Verify & continue
        </Link>
      </div>
    </MobileFrame>
  );
}
