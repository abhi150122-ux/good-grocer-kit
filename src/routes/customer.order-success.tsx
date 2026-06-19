import { createFileRoute, Link } from "@tanstack/react-router";
import { Check, ClipboardList, Home } from "lucide-react";
import { MobileFrame } from "@/components/MobileFrame";

export const Route = createFileRoute("/customer/order-success")({ component: Success });

function Success() {
  return (
    <MobileFrame>
      <div className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-primary-soft to-background px-6 text-center">
        <div className="relative">
          <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
          <div className="relative grid h-28 w-28 place-items-center rounded-full bg-primary text-primary-foreground shadow-pop">
            <Check className="h-14 w-14" strokeWidth={3} />
          </div>
        </div>
        <h1 className="mt-8 text-3xl font-bold">Order placed!</h1>
        <p className="mt-2 max-w-xs text-sm text-muted-foreground">
          Thanks for shopping with FreshCart. Your fresh groceries will arrive in about 30 minutes.
        </p>

        <div className="mt-8 w-full rounded-2xl border bg-card p-4 text-left shadow-soft">
          <div className="flex justify-between text-sm"><span className="text-muted-foreground">Order ID</span><span className="font-semibold">#ORD2042</span></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Total paid</span><span className="font-semibold">₹1,248</span></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">Payment</span><span className="font-semibold">UPI</span></div>
          <div className="mt-2 flex justify-between text-sm"><span className="text-muted-foreground">ETA</span><span className="font-semibold text-primary">10:42 AM</span></div>
        </div>

        <div className="mt-8 grid w-full grid-cols-2 gap-3">
          <Link to="/customer/home" className="flex items-center justify-center gap-2 rounded-full border bg-card py-3 text-sm font-semibold">
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link to="/customer/orders/$id" params={{ id: "ORD2042" }} className="flex items-center justify-center gap-2 rounded-full bg-primary py-3 text-sm font-semibold text-primary-foreground">
            <ClipboardList className="h-4 w-4" /> Track order
          </Link>
        </div>
      </div>
    </MobileFrame>
  );
}
