import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { StatusChip } from "@/components/ui-bits";
import { invoices, rupees, paymentStatusTone } from "@/lib/erp-mock";
import { ArrowLeft, Download, Printer, Share2, Edit3, Leaf } from "lucide-react";

export const Route = createFileRoute("/admin/billing/$id")({
  loader: ({ params }) => {
    const inv = invoices.find((i) => i.id === params.id);
    if (!inv) throw notFound();
    return { inv };
  },
  component: InvoiceDetail,
  notFoundComponent: () => <AdminShell title="Invoice not found"><p className="text-sm text-muted-foreground">This invoice does not exist.</p></AdminShell>,
  errorComponent: () => <AdminShell title="Error"><p className="text-sm text-destructive">Could not load invoice.</p></AdminShell>,
});

function InvoiceDetail() {
  const { inv } = Route.useLoaderData();

  return (
    <AdminShell title={inv.number}>
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <Link to="/admin/billing" className="inline-flex items-center gap-2 text-sm text-muted-foreground"><ArrowLeft className="h-4 w-4" /> Back to billing</Link>
        <div className="flex flex-wrap gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold"><Edit3 className="h-3.5 w-3.5" /> Edit</button>
          <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold"><Download className="h-3.5 w-3.5" /> Download PDF</button>
          <button className="inline-flex items-center gap-1.5 rounded-xl border bg-card px-3 py-2 text-xs font-semibold"><Printer className="h-3.5 w-3.5" /> Print</button>
          <button className="inline-flex items-center gap-1.5 rounded-xl bg-success px-3 py-2 text-xs font-semibold text-success-foreground"><Share2 className="h-3.5 w-3.5" /> Share on WhatsApp</button>
        </div>
      </div>

      <div className="mx-auto max-w-3xl rounded-2xl border bg-card p-6 shadow-soft print:shadow-none md:p-10">
        <div className="flex items-start justify-between border-b pb-6">
          <div className="flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-primary text-primary-foreground"><Leaf className="h-6 w-6" /></div>
            <div>
              <p className="text-lg font-bold tracking-tight">Sri Gopal Khadya Bhandaar</p>
              <p className="text-xs text-muted-foreground">GSTIN: 20AFKFS5547K1ZP</p>
              <p className="text-xs text-muted-foreground">Hatia, Ranchi, Jharkhand</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-[11px] uppercase tracking-wide text-muted-foreground">{inv.type}</p>
            <p className="text-lg font-bold tracking-tight">{inv.number}</p>
            <StatusChip tone={paymentStatusTone(inv.status)}>{inv.status}</StatusChip>
          </div>
        </div>

        <div className="grid gap-6 border-b py-6 md:grid-cols-2">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Billed to</p>
            <p className="mt-2 text-sm font-semibold">{inv.customer}</p>
            <p className="text-xs text-muted-foreground">{inv.phone}</p>
            <p className="mt-1 text-xs text-muted-foreground">{inv.address}</p>
          </div>
          <div className="md:text-right">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Invoice details</p>
            <p className="mt-2 text-xs"><span className="text-muted-foreground">Invoice date: </span><span className="font-medium">{inv.date}</span></p>
            <p className="text-xs"><span className="text-muted-foreground">Due date: </span><span className="font-medium">{inv.dueDate}</span></p>
          </div>
        </div>

        <div className="-mx-6 overflow-x-auto md:-mx-10">
          <table className="w-full min-w-[560px] text-sm">
            <thead className="text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr className="border-b">
                <th className="px-6 py-3 md:px-10">Item</th>
                <th className="px-3 py-3 text-center">Qty</th>
                <th className="px-3 py-3 text-right">Rate</th>
                <th className="px-3 py-3 text-right">GST</th>
                <th className="px-6 py-3 text-right md:px-10">Amount</th>
              </tr>
            </thead>
            <tbody>
              {inv.lines.map((l: typeof inv.lines[number], i: number) => {
                const amt = l.qty * l.rate - l.discount;
                return (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-6 py-3 md:px-10">
                      <p className="font-medium">{l.name}</p>
                      <p className="text-[11px] text-muted-foreground">{l.unit}{l.discount ? ` · disc ${rupees(l.discount)}` : ""}</p>
                    </td>
                    <td className="px-3 py-3 text-center">{l.qty}</td>
                    <td className="px-3 py-3 text-right">{rupees(l.rate)}</td>
                    <td className="px-3 py-3 text-right text-xs text-muted-foreground">{l.gst}%</td>
                    <td className="px-6 py-3 text-right font-semibold md:px-10">{rupees(amt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="mt-6 flex justify-end">
          <dl className="w-full max-w-xs space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd className="font-medium">{rupees(inv.subtotal)}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">GST</dt><dd className="font-medium">{rupees(inv.tax)}</dd></div>
            <div className="my-1 border-t" />
            <div className="flex justify-between"><dt className="font-semibold">Total</dt><dd className="text-lg font-bold">{rupees(inv.total)}</dd></div>
            <div className="flex justify-between text-success"><dt>Paid</dt><dd className="font-medium">{rupees(inv.paid)}</dd></div>
            {inv.paid < inv.total && (
              <div className="flex justify-between text-destructive"><dt>Balance due</dt><dd className="font-bold">{rupees(inv.total - inv.paid)}</dd></div>
            )}
          </dl>
        </div>

        <div className="mt-8 border-t pt-6 text-xs text-muted-foreground">
          <p>Thank you for your business. Please pay by the due date to avoid overdue reminders.</p>
        </div>
      </div>
    </AdminShell>
  );
}
