import type { ReactNode } from "react";

export function MobileFrame({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-primary-soft via-background to-accent/30 md:py-8">
      <div className="mx-auto flex min-h-screen w-full max-w-[440px] flex-col bg-background md:min-h-[860px] md:overflow-hidden md:rounded-[2.5rem] md:shadow-pop md:ring-8 md:ring-foreground/5">
        {children}
      </div>
    </div>
  );
}
