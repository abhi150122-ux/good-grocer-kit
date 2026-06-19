import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/AdminShell";
import { customers, formatPrice } from "@/lib/mock";
import { Search, ChevronRight } from "lucide-react";

export const Route = createFileRoute("/admin/customers")({ component: Customers });

function Customers() {
  return (
    <AdminShell title="Customers">
      <div className="mb-4 flex items-center gap-2 rounded-xl border bg-card px-3 py-2">
        <Search className="h-4 w-4 text-muted-foreground" />
        <input placeholder="Search customers…" className="flex-1 bg-transparent text-sm outline-none" />
      </div>

      <div className="overflow-hidden rounded-2xl border bg-card shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-sm">
            <thead className="bg-secondary/40 text-left text-[11px] uppercase tracking-wide text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Customer</th>
                <th className="px-5 py-3 font-semibold">Phone</th>
                <th className="px-5 py-3 font-semibold">Orders</th>
                <th className="px-5 py-3 font-semibold">Total spent</th>
                <th className="px-5 py-3 font-semibold">Joined</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {customers.map((c) => (
                <tr key={c.id} className="border-t hover:bg-secondary/30">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="grid h-9 w-9 place-items-center rounded-full bg-primary-soft text-xs font-bold text-primary">{c.name.split(" ").map(n => n[0]).join("")}</div>
                      <p className="font-medium">{c.name}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3 text-muted-foreground">{c.phone}</td>
                  <td className="px-5 py-3">{c.orders}</td>
                  <td className="px-5 py-3 font-semibold">{formatPrice(c.spent)}</td>
                  <td className="px-5 py-3 text-muted-foreground">{c.joined}</td>
                  <td className="px-5 py-3 text-right">
                    <Link to="/admin/customers/$id" params={{ id: c.id }} className="grid h-8 w-8 place-items-center rounded-lg border bg-card"><ChevronRight className="h-4 w-4" /></Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminShell>
  );
}
