import { ShoppingBasket } from "lucide-react";

export function BrandLogo({ size = "md", showWord = true }: { size?: "sm" | "md" | "lg"; showWord?: boolean }) {
  const box = size === "lg" ? "h-16 w-16" : size === "sm" ? "h-9 w-9" : "h-12 w-12";
  const icon = size === "lg" ? "h-8 w-8" : size === "sm" ? "h-4 w-4" : "h-6 w-6";
  const title = size === "lg" ? "text-2xl" : size === "sm" ? "text-sm" : "text-lg";
  return (
    <div className="flex items-center gap-2.5">
      <div className={`relative grid ${box} place-items-center rounded-2xl bg-gradient-to-br from-primary to-[oklch(0.5_0.18_148)] text-primary-foreground shadow-pop`}>
        <ShoppingBasket className={icon} strokeWidth={2.4} />
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-accent ring-2 ring-background" />
      </div>
      {showWord && (
        <div className="leading-none">
          <p className={`font-black tracking-tight ${title}`}>Ghar<span className="text-primary">Kart</span></p>
          {size !== "sm" && <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">Fresh · Fast · Home</p>}
        </div>
      )}
    </div>
  );
}
