import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { Leaf } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/customer/splash")({ component: Splash });

function Splash() {
  const nav = useNavigate();
  useEffect(() => {
    const t = setTimeout(() => nav({ to: "/customer/welcome" }), 1600);
    return () => clearTimeout(t);
  }, [nav]);
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-br from-primary to-primary/70 text-primary-foreground">
        <div className="grid h-24 w-24 place-items-center rounded-[2rem] bg-primary-foreground/15 backdrop-blur">
          <Leaf className="h-12 w-12" />
        </div>
        <h1 className="mt-6 text-3xl font-bold tracking-tight">FreshCart</h1>
        <p className="mt-1 text-sm opacity-80">Groceries, delivered fresh</p>
        <div className="absolute bottom-10">
          <Link to="/customer/welcome" className="text-xs uppercase tracking-widest opacity-70">Skip</Link>
        </div>
      </div>
    </MobileFrame>
  );
}
