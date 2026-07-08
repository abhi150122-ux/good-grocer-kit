import { Link } from "@tanstack/react-router";
import { Leaf, Menu, X, Phone, Mail, MapPin } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav = [
  { to: "/default-pages/home", label: "Home" },
  { to: "/default-pages/about", label: "About" },
  { to: "/default-pages/products", label: "Products" },
  { to: "/default-pages/delivery", label: "Delivery" },
  { to: "/default-pages/contact", label: "Contact" },
] as const;

const legal = [
  { to: "/default-pages/privacy-policy", label: "Privacy Policy" },
  { to: "/default-pages/terms", label: "Terms & Conditions" },
  { to: "/default-pages/refund-policy", label: "Refund Policy" },
  { to: "/default-pages/shipping-policy", label: "Shipping Policy" },
] as const;

export function PublicSite({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-30 border-b border-border/60 bg-card/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Link to="/default-pages/home" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-soft">
              <Leaf className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <p className="text-sm font-bold tracking-tight">Sri Gopal Khadya Bhandaar</p>
              <p className="text-[10px] uppercase tracking-widest text-muted-foreground">Ranchi · Jharkhand</p>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-muted-foreground transition hover:bg-secondary hover:text-foreground"
                activeProps={{ className: "rounded-full px-3 py-1.5 text-sm font-semibold bg-primary-soft text-primary" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground md:hidden"
            aria-label="Menu"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
        {open && (
          <div className="border-t bg-card md:hidden">
            <div className="mx-auto grid max-w-6xl gap-1 px-4 py-3">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-3 py-2 text-sm font-medium hover:bg-secondary"
                  activeProps={{ className: "rounded-xl px-3 py-2 text-sm font-semibold bg-primary-soft text-primary" }}
                >
                  {n.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </header>

      <main>{children}</main>

      <footer className="mt-16 border-t bg-card">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 md:grid-cols-4">
          <div>
            <div className="flex items-center gap-2">
              <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground">
                <Leaf className="h-4 w-4" />
              </div>
              <p className="text-sm font-bold">Sri Gopal Khadya Bhandaar</p>
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              Everyday groceries, atta, rice, dal, oil, ghee and masala — delivered fresh across Ranchi.
            </p>
            <p className="mt-3 text-[11px] text-muted-foreground">GSTIN: 20AFKFS5547K1ZP</p>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Explore</p>
            <ul className="mt-3 space-y-2 text-sm">
              {nav.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Legal</p>
            <ul className="mt-3 space-y-2 text-sm">
              {legal.map((n) => (
                <li key={n.to}><Link to={n.to} className="hover:text-primary">{n.label}</Link></li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">Reach us</p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
              <li className="flex items-start gap-2"><MapPin className="mt-0.5 h-4 w-4 text-primary" /> Kantatoli, Ranchi, Jharkhand 834001</li>
              <li className="flex items-center gap-2"><Phone className="h-4 w-4 text-primary" /> +91 98765 43210</li>
              <li className="flex items-center gap-2"><Mail className="h-4 w-4 text-primary" /> care@srigopalkhadya.in</li>
            </ul>
          </div>
        </div>
        <div className="border-t">
          <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-4 py-4 text-[11px] text-muted-foreground md:flex-row">
            <p>© {new Date().getFullYear()} Sri Gopal Khadya Bhandaar. All rights reserved.</p>
            <p>Made with care in Ranchi, Jharkhand.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export function Section({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={"mx-auto max-w-6xl px-4 py-10 md:py-14 " + className}>{children}</section>;
}

export function PageHero({ eyebrow, title, subtitle }: { eyebrow?: string; title: string; subtitle?: string }) {
  return (
    <div className="border-b bg-gradient-to-br from-primary-soft via-background to-accent/40">
      <div className="mx-auto max-w-6xl px-4 py-12 md:py-16">
        {eyebrow && (
          <p className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-primary">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-4 text-3xl font-bold tracking-tight md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-3 max-w-2xl text-sm text-muted-foreground md:text-base">{subtitle}</p>}
      </div>
    </div>
  );
}

export const serviceAreas = [
  { area: "Hatia", city: "Ranchi", state: "Jharkhand", pin: "834003" },
  { area: "Hurdag", city: "Ranchi", state: "Jharkhand", pin: "835221" },
  { area: "Kantatoli", city: "Ranchi", state: "Jharkhand", pin: "834001" },
  { area: "Ashok Nagar", city: "Ranchi", state: "Jharkhand", pin: "834002" },
  { area: "Ginjothakurgaon, Mandar", city: "Ranchi", state: "Jharkhand", pin: "835205" },
];

export const productCatalog = [
  {
    id: "atta-rice-dal",
    title: "Atta, Rice & Dal",
    icon: "🌾",
    items: [
      { name: "Aashirvaad Shudh Chakki Atta", variant: "5 kg", price: 234 },
      { name: "India Gate Basmati Rice", variant: "5 kg", price: 366 },
      { name: "Tata Sampann Unpolished Moong Dal", variant: "500 g", price: 99 },
      { name: "Fortune Chana Besan", variant: "500 g", price: 60 },
    ],
  },
  {
    id: "oil-ghee-masala",
    title: "Oil, Ghee & Masala",
    icon: "🫙",
    items: [
      { name: "Hathi Mustard Oil", variant: "1 L", price: 184 },
      { name: "Amul Ghee", variant: "500 ml", price: 325 },
      { name: "Catch Coriander Powder", variant: "100 g", price: 32 },
      { name: "Tata Salt", variant: "1 kg", price: 29 },
    ],
  },
];
