import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/ui-bits";
import { CustomerShell } from "@/components/CustomerShell";
import { categories, products } from "@/lib/mock";

export const Route = createFileRoute("/customer/categories")({ component: Categories });

function Categories() {
  return (
    <CustomerShell>
      <PageHeader title="All categories" back={false} />
      <div className="grid grid-cols-2 gap-3 p-4">
        {categories.map((c) => {
          const count = products.filter((p) => p.category === c.id).length;
          return (
            <Link
              key={c.id}
              to="/customer/category/$id"
              params={{ id: c.id }}
              className="flex flex-col items-start gap-3 rounded-2xl border bg-card p-4 shadow-soft transition active:scale-[0.98]"
            >
              <div className="grid h-14 w-14 place-items-center rounded-2xl text-3xl" style={{ background: c.color }}>
                {c.icon}
              </div>
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-[11px] text-muted-foreground">{count} items</p>
              </div>
            </Link>
          );
        })}
      </div>
    </CustomerShell>
  );
}
