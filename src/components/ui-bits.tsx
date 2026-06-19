import { Link, useRouter } from "@tanstack/react-router";
import { ArrowLeft, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  right,
  back = true,
}: {
  title: string;
  subtitle?: string;
  right?: ReactNode;
  back?: boolean | string;
}) {
  const router = useRouter();
  return (
    <header className="sticky top-0 z-10 flex items-center gap-3 border-b border-border/60 bg-card/95 px-4 py-3 backdrop-blur">
      {back && (
        typeof back === "string" ? (
          <Link to={back} className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        ) : (
          <button
            onClick={() => router.history.back()}
            className="grid h-9 w-9 place-items-center rounded-full bg-secondary text-secondary-foreground"
            aria-label="Back"
          >
            <ArrowLeft className="h-4 w-4" />
          </button>
        )
      )}
      <div className="min-w-0 flex-1">
        <h1 className="truncate text-base font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="truncate text-xs text-muted-foreground">{subtitle}</p>}
      </div>
      {right}
    </header>
  );
}

export function StatusChip({ children, tone = "neutral" }: { children: ReactNode; tone?: "neutral" | "success" | "warning" | "info" | "danger" }) {
  const map = {
    neutral: "bg-secondary text-secondary-foreground",
    success: "bg-success/15 text-success",
    warning: "bg-warning/15 text-warning-foreground",
    info: "bg-primary-soft text-primary",
    danger: "bg-destructive/15 text-destructive",
  } as const;
  return (
    <span className={"inline-flex items-center gap-1 rounded-full border border-transparent px-2.5 py-0.5 text-[11px] font-medium " + map[tone]}>
      {children}
    </span>
  );
}

export function EmptyState({ icon: Icon, title, desc, action }: { icon: LucideIcon; title: string; desc: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center justify-center px-8 py-16 text-center">
      <div className="grid h-20 w-20 place-items-center rounded-3xl bg-primary-soft text-primary">
        <Icon className="h-9 w-9" />
      </div>
      <h3 className="mt-5 text-lg font-semibold">{title}</h3>
      <p className="mt-1 max-w-xs text-sm text-muted-foreground">{desc}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  );
}
