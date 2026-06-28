import { createFileRoute, Link } from "@tanstack/react-router";
import { OwnerShell, OwnerHeader } from "@/components/OwnerShell";
import { Store, MapPin, Clock, CreditCard, MessageCircle, HelpCircle, LogOut, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/owner/profile")({ component: OwnerProfile });

function OwnerProfile() {
  return (
    <OwnerShell>
      <OwnerHeader title="Store profile" />
      <div className="space-y-4 p-4">
        <div className="rounded-2xl border bg-card p-4 shadow-soft">
          <div className="flex items-center gap-3">
            <div className="grid h-14 w-14 place-items-center rounded-2xl bg-primary-soft text-primary"><Store className="h-6 w-6" /></div>
            <div className="min-w-0">
              <p className="text-base font-bold">FreshCart Koramangala</p>
              <p className="truncate text-xs text-muted-foreground">Aarav Sharma · Owner</p>
              <span className="mt-1 inline-block rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">Open · accepting orders</span>
            </div>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
          <Row icon={MapPin} label="Store address" value="4th Block, Koramangala, Bengaluru" />
          <Row icon={Clock} label="Open hours" value="7:00 AM – 11:00 PM" />
          <Row icon={CreditCard} label="Bank settlement" value="HDFC ****1234" />
          <Row icon={MessageCircle} label="WhatsApp alerts" value="+91 98765 43210" to="/whatsapp" />
        </div>

        <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
          <Row icon={HelpCircle} label="Help & support" />
          <Row icon={LogOut} label="Sign out" danger />
        </div>

        <p className="pt-2 text-center text-[11px] text-muted-foreground">FreshCart Owner · v1.0.0</p>
      </div>
    </OwnerShell>
  );
}

function Row({ icon: Icon, label, value, to, danger }: { icon: any; label: string; value?: string; to?: string; danger?: boolean }) {
  const inner = (
    <div className="flex items-center gap-3 border-b px-4 py-3 last:border-b-0">
      <div className={"grid h-9 w-9 place-items-center rounded-xl " + (danger ? "bg-destructive/15 text-destructive" : "bg-secondary text-secondary-foreground")}>
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0 flex-1">
        <p className={"text-sm font-semibold " + (danger ? "text-destructive" : "")}>{label}</p>
        {value && <p className="truncate text-[11px] text-muted-foreground">{value}</p>}
      </div>
      <ChevronRight className="h-4 w-4 text-muted-foreground" />
    </div>
  );
  if (to) return <Link to={to}>{inner}</Link>;
  return inner;
}
