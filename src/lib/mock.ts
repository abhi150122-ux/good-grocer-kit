export type Product = {
  id: string;
  name: string;
  unit: string;
  price: number;
  mrp: number;
  image: string;
  category: string;
  stock: number;
  rating: number;
  description: string;
};

export type CartItem = { productId: string; qty: number };

export type Order = {
  id: string;
  customer: string;
  phone: string;
  address: string;
  items: { name: string; qty: number; price: number }[];
  total: number;
  payment: "COD" | "UPI";
  status: "Pending" | "Accepted" | "Packed" | "Out for delivery" | "Delivered" | "Rejected";
  partner?: string;
  placedAt: string;
};

const img = (q: string, c = "73C088") =>
  `https://images.unsplash.com/photo-${q}?w=400&q=80&auto=format&fit=crop`;

export const categories = [
  { id: "fruits", name: "Fruits", icon: "🍎", color: "oklch(0.92 0.1 30)" },
  { id: "veggies", name: "Vegetables", icon: "🥦", color: "oklch(0.92 0.1 148)" },
  { id: "dairy", name: "Dairy & Eggs", icon: "🥛", color: "oklch(0.94 0.05 240)" },
  { id: "bakery", name: "Bakery", icon: "🥐", color: "oklch(0.93 0.08 75)" },
  { id: "snacks", name: "Snacks", icon: "🍪", color: "oklch(0.92 0.1 50)" },
  { id: "beverages", name: "Beverages", icon: "🥤", color: "oklch(0.92 0.1 320)" },
  { id: "staples", name: "Staples", icon: "🌾", color: "oklch(0.93 0.08 85)" },
  { id: "personal", name: "Personal Care", icon: "🧴", color: "oklch(0.93 0.05 200)" },
];

export const products: Product[] = [
  { id: "p1", name: "Fresh Red Apples", unit: "1 kg", price: 180, mrp: 220, image: "1568702846914-96b305d2aaeb", category: "fruits", stock: 24, rating: 4.6, description: "Crisp and juicy red apples sourced fresh from Himachal orchards." },
  { id: "p2", name: "Cavendish Bananas", unit: "1 dozen", price: 60, mrp: 75, image: "1571771894821-ce9b6c11b08e", category: "fruits", stock: 50, rating: 4.4, description: "Naturally ripened bananas packed with energy and potassium." },
  { id: "p3", name: "Alphonso Mangoes", unit: "1 kg", price: 420, mrp: 500, image: "1553279768-865429fa0078", category: "fruits", stock: 8, rating: 4.8, description: "Premium Ratnagiri Alphonso — the king of mangoes." },
  { id: "p4", name: "Organic Tomatoes", unit: "500 g", price: 35, mrp: 45, image: "1561136594-7f68413baa99", category: "veggies", stock: 60, rating: 4.3, description: "Farm-fresh organic tomatoes, hand-picked daily." },
  { id: "p5", name: "Broccoli", unit: "250 g", price: 55, mrp: 70, image: "1459411552884-841db9b3cc2a", category: "veggies", stock: 18, rating: 4.5, description: "Crunchy green broccoli florets." },
  { id: "p6", name: "Baby Spinach", unit: "200 g", price: 40, mrp: 50, image: "1576045057995-568f588f82fb", category: "veggies", stock: 30, rating: 4.2, description: "Tender baby spinach leaves." },
  { id: "p7", name: "Amul Full Cream Milk", unit: "1 L", price: 68, mrp: 70, image: "1563636619-e9143da7973b", category: "dairy", stock: 80, rating: 4.7, description: "Fresh full cream milk, pasteurized and homogenized." },
  { id: "p8", name: "Farm Eggs", unit: "12 pcs", price: 95, mrp: 110, image: "1582722872445-44dc5f7e3c8f", category: "dairy", stock: 40, rating: 4.6, description: "Free-range farm eggs, rich in protein." },
  { id: "p9", name: "Greek Yogurt", unit: "400 g", price: 120, mrp: 140, image: "1488477181946-6428a0291777", category: "dairy", stock: 22, rating: 4.5, description: "Thick, creamy Greek yogurt." },
  { id: "p10", name: "Sourdough Loaf", unit: "400 g", price: 150, mrp: 180, image: "1509440159596-0249088772ff", category: "bakery", stock: 12, rating: 4.7, description: "Artisan sourdough baked fresh every morning." },
  { id: "p11", name: "Butter Croissants", unit: "4 pcs", price: 180, mrp: 220, image: "1555507036-ab1f4038808a", category: "bakery", stock: 0, rating: 4.8, description: "Flaky French butter croissants." },
  { id: "p12", name: "Dark Chocolate Cookies", unit: "200 g", price: 90, mrp: 110, image: "1499636136210-6f4ee915583e", category: "snacks", stock: 36, rating: 4.4, description: "Crunchy cookies loaded with dark chocolate chunks." },
  { id: "p13", name: "Roasted Almonds", unit: "250 g", price: 320, mrp: 380, image: "1508061253366-f7da158b6d46", category: "snacks", stock: 25, rating: 4.6, description: "Premium California almonds, lightly roasted." },
  { id: "p14", name: "Cold-Pressed Orange Juice", unit: "1 L", price: 220, mrp: 260, image: "1600271886742-f049cd451bba", category: "beverages", stock: 14, rating: 4.5, description: "100% pure orange juice, no added sugar." },
  { id: "p15", name: "Green Tea", unit: "25 bags", price: 180, mrp: 220, image: "1576092768241-dec231879fc3", category: "beverages", stock: 40, rating: 4.4, description: "Refreshing green tea bags." },
  { id: "p16", name: "Basmati Rice", unit: "5 kg", price: 620, mrp: 720, image: "1586201375761-83865001e31c", category: "staples", stock: 30, rating: 4.7, description: "Long-grain aged basmati rice." },
  { id: "p17", name: "Whole Wheat Atta", unit: "5 kg", price: 320, mrp: 380, image: "1568051243858-533a607809a5", category: "staples", stock: 45, rating: 4.6, description: "Stone-ground whole wheat flour." },
  { id: "p18", name: "Herbal Shampoo", unit: "300 ml", price: 280, mrp: 350, image: "1571781926291-c477ebfd024b", category: "personal", stock: 20, rating: 4.3, description: "Sulphate-free herbal shampoo." },
];

export const banners = [
  { id: "b1", title: "Fresh Picks", subtitle: "Up to 30% off on fruits", cta: "Shop now", bg: "linear-gradient(135deg, oklch(0.7 0.18 148), oklch(0.55 0.18 148))" },
  { id: "b2", title: "Free Delivery", subtitle: "On orders above ₹499", cta: "Order now", bg: "linear-gradient(135deg, oklch(0.78 0.16 75), oklch(0.65 0.18 50))" },
  { id: "b3", title: "Daily Essentials", subtitle: "Milk, bread & eggs in 30 mins", cta: "Browse", bg: "linear-gradient(135deg, oklch(0.7 0.15 200), oklch(0.55 0.18 240))" },
];

export const addresses = [
  { id: "a1", label: "Home", line: "Flat 402, Sunshine Apartments", area: "Koramangala 4th Block", city: "Bengaluru 560034", default: true },
  { id: "a2", label: "Work", line: "5th Floor, Prestige Tech Park", area: "Sarjapur Road", city: "Bengaluru 560103", default: false },
];

export const orders: Order[] = [
  { id: "ORD2041", customer: "Aarav Sharma", phone: "+91 98765 43210", address: "Flat 402, Koramangala, Bengaluru", items: [{ name: "Fresh Red Apples", qty: 2, price: 180 }, { name: "Amul Milk", qty: 1, price: 68 }], total: 428, payment: "UPI", status: "Out for delivery", partner: "Ravi Kumar", placedAt: "Today, 10:24 AM" },
  { id: "ORD2040", customer: "Meera Iyer", phone: "+91 99887 22110", address: "12, Indiranagar 2nd Stage", items: [{ name: "Basmati Rice", qty: 1, price: 620 }], total: 620, payment: "COD", status: "Pending", placedAt: "Today, 09:55 AM" },
  { id: "ORD2039", customer: "Rohit Verma", phone: "+91 90000 11122", address: "B-204, HSR Layout", items: [{ name: "Eggs", qty: 2, price: 95 }, { name: "Bread", qty: 1, price: 150 }], total: 340, payment: "UPI", status: "Delivered", partner: "Suresh M.", placedAt: "Yesterday, 06:10 PM" },
  { id: "ORD2038", customer: "Priya Nair", phone: "+91 97000 88877", address: "44, Whitefield Main Rd", items: [{ name: "Greek Yogurt", qty: 3, price: 120 }], total: 360, payment: "COD", status: "Accepted", placedAt: "Today, 08:31 AM" },
  { id: "ORD2037", customer: "Kabir Singh", phone: "+91 98123 44556", address: "9, JP Nagar Phase 6", items: [{ name: "Broccoli", qty: 2, price: 55 }, { name: "Spinach", qty: 1, price: 40 }], total: 150, payment: "UPI", status: "Packed", placedAt: "Today, 07:48 AM" },
  { id: "ORD2036", customer: "Sneha Roy", phone: "+91 90909 12345", address: "78, BTM 2nd Stage", items: [{ name: "Croissants", qty: 1, price: 180 }], total: 180, payment: "COD", status: "Rejected", placedAt: "Yesterday, 02:10 PM" },
];

export const customers = [
  { id: "c1", name: "Aarav Sharma", phone: "+91 98765 43210", orders: 14, spent: 8420, joined: "Mar 2024" },
  { id: "c2", name: "Meera Iyer", phone: "+91 99887 22110", orders: 9, spent: 5210, joined: "Jan 2024" },
  { id: "c3", name: "Rohit Verma", phone: "+91 90000 11122", orders: 22, spent: 14300, joined: "Nov 2023" },
  { id: "c4", name: "Priya Nair", phone: "+91 97000 88877", orders: 4, spent: 1820, joined: "May 2024" },
  { id: "c5", name: "Kabir Singh", phone: "+91 98123 44556", orders: 11, spent: 6970, joined: "Feb 2024" },
];

export const partners = [
  { id: "d1", name: "Ravi Kumar", phone: "+91 90111 22233", zone: "South", active: true, deliveries: 124, rating: 4.8 },
  { id: "d2", name: "Suresh M.", phone: "+91 90222 33344", zone: "East", active: true, deliveries: 98, rating: 4.6 },
  { id: "d3", name: "Anil Yadav", phone: "+91 90333 44455", zone: "Central", active: false, deliveries: 41, rating: 4.3 },
  { id: "d4", name: "Vikram Patel", phone: "+91 90444 55566", zone: "West", active: true, deliveries: 76, rating: 4.7 },
];

export const salesData = [
  { day: "Mon", sales: 12400 }, { day: "Tue", sales: 15200 }, { day: "Wed", sales: 11800 },
  { day: "Thu", sales: 18600 }, { day: "Fri", sales: 21400 }, { day: "Sat", sales: 26800 }, { day: "Sun", sales: 24100 },
];

export const formatPrice = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const statusColor = (s: Order["status"]) => {
  switch (s) {
    case "Pending": return "bg-warning/15 text-warning-foreground border-warning/30";
    case "Accepted": return "bg-primary-soft text-primary border-primary/20";
    case "Packed": return "bg-accent text-accent-foreground border-accent";
    case "Out for delivery": return "bg-chart-4/15 text-chart-4 border-chart-4/30";
    case "Delivered": return "bg-success/15 text-success border-success/30";
    case "Rejected": return "bg-destructive/15 text-destructive border-destructive/30";
  }
};

export const productImage = (p: Product) =>
  `https://images.unsplash.com/photo-${p.image}?w=600&q=80&auto=format&fit=crop`;
