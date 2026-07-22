import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { PublicSite, productCatalog } from "@/components/PublicSite";
import { Search, ShoppingCart, Star, Plus } from "lucide-react";

export const Route = createFileRoute("/default-pages/shop")({
  head: () => ({
    meta: [
      { title: "Shop groceries online — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Order pantry staples, atta, rice, dal, oils, ghee and masala online. Free delivery on orders above ₹149 across Ranchi." },
      { property: "og:title", content: "Sri Gopal Khadya Bhandaar — Online store" },
      { property: "og:description", content: "Fresh pantry staples delivered across Ranchi. Free delivery above ₹149." },
    ],
  }),
  component: Shop,
});

type ShopItem = { name: string; variant: string; price: number; category: string };

function Shop() {
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string>("All");
  const [cart, setCart] = useState<Record<string, number>>({});

  const cats = ["All", ...productCatalog.map((c) => c.title)];
  const flat = useMemo<ShopItem[]>(() => productCatalog.flatMap((c) => c.items.map((i) => ({ ...i, category: c.title }))), []);
  const list = flat.filter((p) => (cat === "All" || p.category === cat) && (q === "" || p.name.toLowerCase().includes(q.toLowerCase())));

  const cartCount = Object.values(cart).reduce((s, n) => s + n, 0);
  const cartTotal = flat.filter((p) => cart[p.name]).reduce((s, p) => s + p.price * (cart[p.name] || 0), 0);


  const add = (name: string) => setCart((c) => ({ ...c, [name]: (c[name] || 0) + 1 }));

  return (
    <PublicSite>
      <section className="border-b bg-gradient-to-br from-primary-soft to-card px-4 py-12 md:px-10">
        <div className="mx-auto max-w-6xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">Online store</p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight md:text-4xl">Fresh pantry staples, delivered daily</h1>
          <p className="mt-2 max-w-xl text-sm text-muted-foreground">Free delivery on orders above ₹149. Serving Hatia, Hurdag, Kantatoli, Ashok Nagar and Ginjothakurgaon.</p>
          <div className="mt-6 flex max-w-xl items-center gap-2 rounded-2xl border bg-card px-4 py-3 shadow-soft">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search for atta, oil, rice…" className="flex-1 bg-transparent text-sm outline-none" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-10 md:px-10">
        <div className="-mx-1 mb-5 flex gap-2 overflow-x-auto px-1 pb-1">
          {cats.map((c) => (
            <button key={c} onClick={() => setCat(c)} className={"shrink-0 rounded-full border px-3 py-1.5 text-xs font-medium " + (cat === c ? "border-primary bg-primary text-primary-foreground" : "bg-card")}>{c}</button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <div key={p.name} className="group rounded-2xl border bg-card p-3 shadow-soft transition hover:shadow-pop">
              <div className="aspect-square w-full rounded-xl bg-gradient-to-br from-primary-soft to-secondary/50 grid place-items-center text-4xl">🛒</div>
              <p className="mt-3 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">{p.category}</p>
              <p className="mt-1 line-clamp-2 text-sm font-semibold">{p.name}</p>
              <div className="mt-1 flex items-center gap-1 text-[11px] text-warning-foreground">
                <Star className="h-3 w-3 fill-current" /> 4.6
              </div>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-base font-bold">₹{p.price}</span>
                <button onClick={() => add(p.name)} className="inline-flex items-center gap-1 rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-primary-foreground">
                  {cart[p.name] ? cart[p.name] + " · Add" : (<><Plus className="h-3 w-3" /> Add</>)}
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {cartCount > 0 && (
        <div className="fixed inset-x-0 bottom-4 z-40 mx-auto max-w-xl px-4">
          <div className="flex items-center justify-between rounded-2xl bg-primary p-4 text-primary-foreground shadow-pop">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-primary-foreground/15">
                <ShoppingCart className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm font-bold">{cartCount} item{cartCount === 1 ? "" : "s"}</p>
                <p className="text-[11px] opacity-90">₹{cartTotal.toLocaleString("en-IN")}</p>
              </div>
            </div>
            <Link to="/default-pages/contact" className="rounded-full bg-primary-foreground px-4 py-2 text-xs font-bold text-primary">Enquire</Link>
          </div>
        </div>
      )}
    </PublicSite>
  );
}
