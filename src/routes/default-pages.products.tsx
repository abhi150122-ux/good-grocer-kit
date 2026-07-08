import { createFileRoute } from "@tanstack/react-router";
import { PublicSite, PageHero, Section, productCatalog } from "@/components/PublicSite";

export const Route = createFileRoute("/default-pages/products")({
  head: () => ({
    meta: [
      { title: "Products — Sri Gopal Khadya Bhandaar" },
      { name: "description", content: "Browse atta, rice, dal, oil, ghee and masala from Sri Gopal Khadya Bhandaar with transparent prices." },
    ],
  }),
  component: Products,
});

function Products() {
  return (
    <PublicSite>
      <PageHero
        eyebrow="Our catalog"
        title="Everyday pantry essentials, honestly priced."
        subtitle="Only trusted brands, fresh stock and transparent pricing on every product."
      />

      <Section className="space-y-10">
        {productCatalog.map((cat) => (
          <div key={cat.id}>
            <div className="flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-2xl bg-primary-soft text-2xl">{cat.icon}</div>
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-muted-foreground">Category</p>
                <h2 className="text-xl font-bold tracking-tight md:text-2xl">{cat.title}</h2>
              </div>
            </div>

            <div className="mt-5 overflow-hidden rounded-2xl border bg-card shadow-soft">
              <div className="hidden grid-cols-12 border-b bg-secondary/60 px-5 py-3 text-[11px] font-bold uppercase tracking-widest text-muted-foreground sm:grid">
                <div className="col-span-7">Product</div>
                <div className="col-span-3">Variant</div>
                <div className="col-span-2 text-right">Price</div>
              </div>
              {cat.items.map((it) => (
                <div key={it.name} className="grid grid-cols-12 items-center gap-2 border-b px-5 py-4 last:border-b-0">
                  <div className="col-span-12 sm:col-span-7">
                    <p className="text-sm font-semibold">{it.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground sm:hidden">{it.variant}</p>
                  </div>
                  <div className="col-span-6 hidden text-sm text-muted-foreground sm:block sm:col-span-3">{it.variant}</div>
                  <div className="col-span-12 flex justify-start sm:col-span-2 sm:justify-end">
                    <span className="rounded-full bg-primary-soft px-3 py-1 text-sm font-bold text-primary">₹{it.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        <p className="text-center text-xs text-muted-foreground">
          Prices shown are indicative and may change based on brand MRP. For bulk enquiries please contact the store.
        </p>
      </Section>
    </PublicSite>
  );
}
