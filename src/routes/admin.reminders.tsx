import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { invoices, rupees, paymentStatusTone } from "@/lib/erp-mock";
import { AlertCircle, Clock, CalendarClock, MessageCircle, Send } from "lucide-react";

export const Route = createFileRoute("/admin/reminders")({ component: Reminders });

function Reminders() {
  const overdue = invoices.filter((i) => i.status === "Overdue");
  const pending = invoices.filter((i) => i.status === "Unpaid" || i.status === "Partial");
  const upcoming = pending.filter((i) => i.status !== "Overdue");

  const pendingAmt = pending.reduce((s, i) => s + (i.total - i.paid), 0);
  const overdueAmt = overdue.reduce((s, i) => s + (i.total - i.paid), 0);
  const upcomingAmt = upcoming.reduce((s, i) => s + (i.total - i.paid), 0);

  return (
    <AdminShell title="Payment Reminders">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <Card icon={Clock} tone="bg-warning/15 text-warning-foreground" label="Pending payments" value={rupees(pendingAmt)} count={pending.length} />
        <Card icon={AlertCircle} tone="bg-destructive/15 text-destructive" label="Overdue" value={rupees(overdueAmt)} count={overdue.length} />
        <Card icon={CalendarClock} tone="bg-primary-soft text-primary" label="Upcoming due" value={rupees(upcomingAmt)} count={upcoming.length} />
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold">Outstanding invoices</h3>
        <p className="text-xs text-muted-foreground">Send a WhatsApp reminder in one tap</p>
        <div className="mt-4 space-y-2">
          {pending.map((i) => (
            <div key={i.id} className="flex flex-col gap-3 rounded-2xl border p-4 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <Link to="/admin/billing/$id" params={{ id: i.id }} className="text-sm font-semibold text-primary">{i.number}</Link>
                  <StatusChip tone={paymentStatusTone(i.status)}>{i.status}</StatusChip>
                </div>
                <p className="mt-1 text-sm font-medium">{i.customer}</p>
                <p className="text-[11px] text-muted-foreground">{i.phone} · due {i.dueDate}</p>
              </div>
              <div className="flex items-center gap-3">
                <div className="text-right">
                  <p className="text-xs text-muted-foreground">Balance</p>
                  <p className="text-base font-bold">{rupees(i.total - i.paid)}</p>
                </div>
                <a href="#" className="inline-flex items-center gap-1.5 rounded-xl bg-success px-3 py-2 text-xs font-semibold text-success-foreground">
                  <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                </a>
              </div>
            </div>
          ))}
          {pending.length === 0 && <p className="py-10 text-center text-sm text-muted-foreground">No outstanding invoices. Great work!</p>}
        </div>
      </div>

      <div className="mt-5 rounded-2xl border bg-card p-5 shadow-soft">
        <h3 className="text-sm font-semibold">Reminder history</h3>
        <ul className="mt-4 space-y-2">
          {[
            { when: "Today, 09:20 AM", to: "Priya Nair", inv: "INV-2025-0040", channel: "WhatsApp" },
            { when: "Yesterday, 04:15 PM", to: "Rohit Verma", inv: "QUO-2025-0009", channel: "SMS" },
            { when: "20 Jul, 11:00 AM", to: "Meera Iyer", inv: "INV-2025-0041", channel: "WhatsApp" },
          ].map((h, i) => (
            <li key={i} className="flex items-center gap-3 rounded-xl border p-3">
              <div className="grid h-9 w-9 place-items-center rounded-lg bg-primary-soft text-primary"><Send className="h-4 w-4" /></div>
              <div className="min-w-0 flex-1">
                <p className="text-sm"><span className="font-semibold">{h.to}</span> · <span className="text-primary">{h.inv}</span></p>
                <p className="text-[11px] text-muted-foreground">{h.channel} · {h.when}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </AdminShell>
  );
}

function Card({ icon: Icon, tone, label, value, count }: { icon: any; tone: string; label: string; value: string; count: number }) {
  return (
    <div className="rounded-2xl border bg-card p-5 shadow-soft">
      <div className={"grid h-10 w-10 place-items-center rounded-xl " + tone}><Icon className="h-5 w-5" /></div>
      <p className="mt-3 text-2xl font-bold tracking-tight">{value}</p>
      <p className="text-xs text-muted-foreground">{label} · {count} invoices</p>
    </div>
  );
}
