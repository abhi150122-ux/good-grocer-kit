import { createFileRoute, Link } from "@tanstack/react-router";
import { Check } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/delivery/delivered/$id")({ component: Delivered });

function Delivered() {
  const { id } = Route.useParams();
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary-soft to-background px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-success/20" />
          <div className="relative grid h-28 w-28 place-items-center rounded-full bg-success text-success-foreground shadow-pop">
            <Check className="h-14 w-14" strokeWidth={3} />
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold">Delivered!</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Order <span className="font-semibold text-foreground">#{id}</span> has been successfully delivered. Great job!
        </p>

        <div className="mt-6 w-full rounded-2xl border bg-card p-4 text-left shadow-soft">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Delivery time</span><span className="font-semibold">27 mins</span></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Cash collected</span><span className="font-semibold">₹620</span></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Your earning</span><span className="font-semibold text-success">+₹45</span></div>
        </div>

        <Link to="/delivery/orders" className="mt-8 grid h-12 w-full place-items-center rounded-full bg-primary text-sm font-semibold text-primary-foreground shadow-card">
          Back to orders
        </Link>
      </div>
    </MobileFrame>
  );
}
