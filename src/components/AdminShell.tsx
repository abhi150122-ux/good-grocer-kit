import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard, Package, ShoppingBag, Users, Bike, BarChart3, Leaf, Bell, Search, Menu, X, type LucideIcon } from "lucide-react";
import { useState, type ReactNode } from "react";

const nav: { to: string; label: string; icon: LucideIcon }[] = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { to: "/admin/products", label: "Products", icon: Package },
  { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
  { to: "/admin/customers", label: "Customers", icon: Users },
  { to: "/admin/delivery", label: "Delivery partners", icon: Bike },
  { to: "/admin/reports", label: "Reports", icon: BarChart3 },
];

export function AdminShell({ title, children, action }: { title: string; children: ReactNode; action?: ReactNode }) {
  const path = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);
  const isActive = (to: string) => to === "/admin" ? path === "/admin" : path.startsWith(to);

  return (
    <div className="min-h-screen bg-secondary/30 lg:flex">
      {/* Sidebar - desktop */}
      <aside className="hidden w-64 shrink-0 border-r bg-sidebar lg:flex lg:flex-col">
        <SidebarContent isActive={isActive} />
      </aside>

      {/* Mobile sidebar */}
      {open && (
        <div className="fixed inset-0 z-40 lg:hidden" onClick={() => setOpen(false)}>
          <div className="absolute inset-0 bg-foreground/40" />
          <aside className="absolute left-0 top-0 h-full w-72 border-r bg-sidebar" onClick={(e) => e.stopPropagation()}>
            <SidebarContent isActive={isActive} onNavigate={() => setOpen(false)} />
          </aside>
        </div>
      )}

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b bg-card/95 px-4 py-3 backdrop-blur lg:px-8">
          <button onClick={() => setOpen(true)} className="grid h-9 w-9 place-items-center rounded-xl border bg-card lg:hidden">
            <Menu className="h-4 w-4" />
          </button>
          <div className="min-w-0 flex-1">
            <h1 className="truncate text-lg font-bold tracking-tight">{title}</h1>
          </div>
          <div className="hidden md:flex items-center gap-2 rounded-xl border bg-secondary/50 px-3 py-2">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input placeholder="Search…" className="w-48 bg-transparent text-sm outline-none" />
          </div>
          <button className="relative grid h-9 w-9 place-items-center rounded-xl border bg-card">
            <Bell className="h-4 w-4" />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-destructive" />
          </button>
          {action}
          <div className="grid h-9 w-9 place-items-center rounded-full bg-primary text-xs font-bold text-primary-foreground">AV</div>
        </header>
        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

function SidebarContent({ isActive, onNavigate }: { isActive: (to: string) => boolean; onNavigate?: () => void }) {
  return (
    <>
      <div className="flex items-center justify-between p-5">
        <Link to="/admin" className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-primary-foreground"><Leaf className="h-5 w-5" /></div>
          <div>
            <p className="text-sm font-bold leading-none">FreshCart</p>
            <p className="mt-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">Admin</p>
          </div>
        </Link>
        {onNavigate && <button onClick={onNavigate} className="lg:hidden"><X className="h-5 w-5" /></button>}
      </div>
      <nav className="flex-1 px-3 py-2">
        {nav.map((n) => {
          const active = isActive(n.to);
          return (
            <Link
              key={n.to}
              to={n.to}
              onClick={onNavigate}
              className={
                "mb-1 flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition " +
                (active ? "bg-primary text-primary-foreground shadow-soft" : "text-sidebar-foreground hover:bg-sidebar-accent")
              }
            >
              <n.icon className="h-4 w-4" /> {n.label}
            </Link>
          );
        })}
      </nav>
      <div className="m-3 rounded-2xl bg-gradient-to-br from-primary to-primary/70 p-4 text-primary-foreground">
        <p className="text-xs font-semibold">Need help?</p>
        <p className="mt-1 text-[11px] opacity-90">Read our admin handbook</p>
        <button className="mt-2 rounded-full bg-primary-foreground/90 px-3 py-1 text-[11px] font-semibold text-foreground">Open guide</button>
      </div>
    </>
  );
}
