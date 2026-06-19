import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Search as SearchIcon, X, Clock, TrendingUp, Plus } from "lucide-react";
import { CustomerShell } from "@/components/CustomerShell";
import { products, productImage, formatPrice } from "@/lib/mock";

export const Route = createFileRoute("/customer/search")({ component: SearchPage });

const recent = ["Apples", "Milk", "Bread", "Tomatoes"];
const trending = ["Mangoes", "Greek yogurt", "Basmati rice", "Almonds"];

function SearchPage() {
  const [q, setQ] = useState("");
  const results = q.trim()
    ? products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()))
    : [];

  return (
    <CustomerShell>
      <div className="sticky top-0 z-10 bg-card/95 px-4 py-3 backdrop-blur">
        <div className="flex items-center gap-2 rounded-2xl border bg-secondary/40 px-4 py-3 focus-within:ring-2 focus-within:ring-primary/40">
          <SearchIcon className="h-4 w-4 text-muted-foreground" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search for groceries, brands…"
            className="flex-1 bg-transparent text-sm outline-none"
          />
          {q && <button onClick={() => setQ("")}><X className="h-4 w-4 text-muted-foreground" /></button>}
        </div>
      </div>

      {!q && (
        <div className="px-5 py-4">
          <div>
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><Clock className="h-3.5 w-3.5" /> RECENT</div>
            <div className="flex flex-wrap gap-2">
              {recent.map((r) => (
                <button key={r} onClick={() => setQ(r)} className="rounded-full border bg-card px-3 py-1.5 text-xs font-medium">{r}</button>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <div className="mb-2 flex items-center gap-2 text-xs font-semibold text-muted-foreground"><TrendingUp className="h-3.5 w-3.5" /> TRENDING</div>
            <div className="flex flex-wrap gap-2">
              {trending.map((r) => (
                <button key={r} onClick={() => setQ(r)} className="rounded-full bg-primary-soft px-3 py-1.5 text-xs font-medium text-primary">{r}</button>
              ))}
            </div>
          </div>
        </div>
      )}

      {q && (
        <div className="px-4 pb-4">
          <p className="px-1 py-3 text-xs text-muted-foreground">{results.length} results for "{q}"</p>
          {results.length === 0 ? (
            <div className="rounded-2xl border bg-card p-8 text-center">
              <p className="text-sm font-semibold">No products found</p>
              <p className="mt-1 text-xs text-muted-foreground">Try a different keyword or browse categories.</p>
            </div>
          ) : (
            <ul className="space-y-2">
              {results.map((p) => (
                <li key={p.id}>
                  <Link to="/customer/product/$id" params={{ id: p.id }} className="flex items-center gap-3 rounded-2xl border bg-card p-2.5 shadow-soft">
                    <img src={productImage(p)} alt={p.name} className="h-16 w-16 rounded-xl object-cover" />
                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="text-[11px] text-muted-foreground">{p.unit}</p>
                      <p className="mt-0.5 text-sm font-bold">{formatPrice(p.price)}</p>
                    </div>
                    <button className="grid h-9 w-9 place-items-center rounded-full bg-primary text-primary-foreground"><Plus className="h-4 w-4" /></button>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </CustomerShell>
  );
}
