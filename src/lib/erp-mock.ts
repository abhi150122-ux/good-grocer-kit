// ERP mock data layer
export type InvoiceType = "GST Invoice" | "Non-GST Invoice" | "Quotation" | "Proforma" | "Delivery Challan" | "Purchase Order";
export type PaymentStatus = "Paid" | "Partial" | "Unpaid" | "Overdue";

export type InvoiceLine = { name: string; qty: number; unit: string; rate: number; discount: number; gst: number };
export type Invoice = {
  id: string;
  number: string;
  type: InvoiceType;
  date: string;
  dueDate: string;
  customer: string;
  phone: string;
  address: string;
  lines: InvoiceLine[];
  subtotal: number;
  tax: number;
  total: number;
  paid: number;
  status: PaymentStatus;
};

export type Supplier = {
  id: string;
  name: string;
  phone: string;
  gstin?: string;
  address: string;
  purchases: number;
  paid: number;
  outstanding: number;
};

export type Purchase = {
  id: string;
  number: string;
  date: string;
  supplier: string;
  items: { name: string; qty: number; unit: string; rate: number; gst: number }[];
  total: number;
  paid: number;
  status: PaymentStatus;
};

export type InventoryItem = {
  id: string;
  sku: string;
  name: string;
  category: string;
  unit: "Kg" | "Gram" | "Litre" | "ml" | "Bottle" | "Packet" | "Piece" | "Box";
  purchasePrice: number;
  sellingPrice: number;
  stock: number;
  minStock: number;
  barcode: string;
};

export type StockMovement = {
  id: string;
  date: string;
  product: string;
  type: "Purchase" | "Sale" | "Return" | "Adjustment";
  qty: number;
  balance: number;
  reference: string;
};

export type Expense = {
  id: string;
  date: string;
  category: string;
  description: string;
  amount: number;
  paidVia: "Cash" | "Bank" | "UPI";
};

export type CashTxn = {
  id: string;
  date: string;
  type: "Receipt" | "Payment";
  account: "Cash" | "HDFC Bank" | "SBI Bank" | "UPI";
  party: string;
  amount: number;
  note: string;
};

export type LedgerEntry = {
  id: string;
  date: string;
  reference: string;
  debit: number;
  credit: number;
  balance: number;
  note: string;
};

const rupees = (n: number) => `₹${n.toLocaleString("en-IN")}`;

export const invoices: Invoice[] = [
  {
    id: "inv1", number: "INV-2025-0042", type: "GST Invoice", date: "22 Jul 2026", dueDate: "05 Aug 2026",
    customer: "Aarav Sharma", phone: "+91 98765 43210", address: "Flat 402, Koramangala, Bengaluru 560034",
    lines: [
      { name: "Aashirvaad Atta 5kg", qty: 2, unit: "Packet", rate: 234, discount: 0, gst: 5 },
      { name: "India Gate Basmati 5kg", qty: 1, unit: "Packet", rate: 366, discount: 10, gst: 5 },
    ],
    subtotal: 824, tax: 41, total: 865, paid: 865, status: "Paid",
  },
  {
    id: "inv2", number: "INV-2025-0041", type: "GST Invoice", date: "21 Jul 2026", dueDate: "04 Aug 2026",
    customer: "Meera Iyer", phone: "+91 99887 22110", address: "12, Indiranagar 2nd Stage, Bengaluru",
    lines: [{ name: "Hathi Mustard Oil 1L", qty: 5, unit: "Bottle", rate: 184, discount: 0, gst: 5 }],
    subtotal: 920, tax: 46, total: 966, paid: 500, status: "Partial",
  },
  {
    id: "inv3", number: "QUO-2025-0009", type: "Quotation", date: "20 Jul 2026", dueDate: "30 Jul 2026",
    customer: "Rohit Verma", phone: "+91 90000 11122", address: "B-204, HSR Layout, Bengaluru",
    lines: [{ name: "Amul Ghee 500ml", qty: 10, unit: "Packet", rate: 325, discount: 25, gst: 12 }],
    subtotal: 3225, tax: 387, total: 3612, paid: 0, status: "Unpaid",
  },
  {
    id: "inv4", number: "INV-2025-0040", type: "GST Invoice", date: "10 Jul 2026", dueDate: "17 Jul 2026",
    customer: "Priya Nair", phone: "+91 97000 88877", address: "44, Whitefield Main Rd, Bengaluru",
    lines: [{ name: "Tata Sampann Moong Dal 500g", qty: 4, unit: "Packet", rate: 99, discount: 0, gst: 5 }],
    subtotal: 396, tax: 20, total: 416, paid: 0, status: "Overdue",
  },
  {
    id: "inv5", number: "DC-2025-0018", type: "Delivery Challan", date: "22 Jul 2026", dueDate: "22 Jul 2026",
    customer: "Kabir Singh", phone: "+91 98123 44556", address: "9, JP Nagar Phase 6, Bengaluru",
    lines: [{ name: "Fortune Chana Besan 500g", qty: 6, unit: "Packet", rate: 60, discount: 0, gst: 0 }],
    subtotal: 360, tax: 0, total: 360, paid: 0, status: "Unpaid",
  },
];

export const suppliers: Supplier[] = [
  { id: "s1", name: "Adani Wilmar Ltd", phone: "+91 22 6656 1234", gstin: "24AABCA1234K1Z5", address: "Ahmedabad, Gujarat", purchases: 245800, paid: 200000, outstanding: 45800 },
  { id: "s2", name: "ITC Aashirvaad Distributor", phone: "+91 33 4444 5566", gstin: "19AABCI2345L1Z9", address: "Kolkata, WB", purchases: 182400, paid: 182400, outstanding: 0 },
  { id: "s3", name: "Tata Consumer Products", phone: "+91 80 6789 0011", gstin: "29AAACT2727Q1ZC", address: "Bengaluru, KA", purchases: 96500, paid: 60000, outstanding: 36500 },
  { id: "s4", name: "Hathi Oils Pvt Ltd", phone: "+91 79 3344 5566", gstin: "24AAECH8899R1Z2", address: "Rajkot, Gujarat", purchases: 74200, paid: 50000, outstanding: 24200 },
  { id: "s5", name: "Amul Retail Depot", phone: "+91 79 2555 0000", gstin: "24AAAGG0001A1ZA", address: "Anand, Gujarat", purchases: 128600, paid: 128600, outstanding: 0 },
];

export const purchases: Purchase[] = [
  { id: "pur1", number: "PO-2025-0022", date: "22 Jul 2026", supplier: "Adani Wilmar Ltd", items: [{ name: "Fortune Sunflower Oil 1L", qty: 60, unit: "Bottle", rate: 145, gst: 5 }], total: 9135, paid: 5000, status: "Partial" },
  { id: "pur2", number: "PO-2025-0021", date: "20 Jul 2026", supplier: "ITC Aashirvaad Distributor", items: [{ name: "Aashirvaad Atta 5kg", qty: 40, unit: "Packet", rate: 212, gst: 5 }], total: 8904, paid: 8904, status: "Paid" },
  { id: "pur3", number: "PO-2025-0020", date: "18 Jul 2026", supplier: "Tata Consumer Products", items: [{ name: "Tata Salt 1kg", qty: 100, unit: "Packet", rate: 22, gst: 5 }, { name: "Tata Sampann Moong Dal 500g", qty: 30, unit: "Packet", rate: 82, gst: 5 }], total: 4894, paid: 0, status: "Unpaid" },
  { id: "pur4", number: "PO-2025-0019", date: "15 Jul 2026", supplier: "Hathi Oils Pvt Ltd", items: [{ name: "Hathi Mustard Oil 1L", qty: 80, unit: "Bottle", rate: 165, gst: 5 }], total: 13860, paid: 10000, status: "Partial" },
];

export const inventory: InventoryItem[] = [
  { id: "iv1", sku: "ATT-AAS-5K", name: "Aashirvaad Atta 5kg", category: "Atta, Rice & Dal", unit: "Packet", purchasePrice: 212, sellingPrice: 234, stock: 120, minStock: 20, barcode: "8901030800321" },
  { id: "iv2", sku: "RIC-IGB-5K", name: "India Gate Basmati Rice 5kg", category: "Atta, Rice & Dal", unit: "Packet", purchasePrice: 340, sellingPrice: 366, stock: 65, minStock: 15, barcode: "8901234567890" },
  { id: "iv3", sku: "DAL-TSM-500", name: "Tata Sampann Moong Dal 500g", category: "Atta, Rice & Dal", unit: "Packet", purchasePrice: 82, sellingPrice: 99, stock: 8, minStock: 15, barcode: "8901058800011" },
  { id: "iv4", sku: "BSN-FOR-500", name: "Fortune Chana Besan 500g", category: "Atta, Rice & Dal", unit: "Packet", purchasePrice: 48, sellingPrice: 60, stock: 42, minStock: 20, barcode: "8901725100234" },
  { id: "iv5", sku: "OIL-HAT-1L", name: "Hathi Mustard Oil 1L", category: "Oil, Ghee & Masala", unit: "Bottle", purchasePrice: 165, sellingPrice: 184, stock: 90, minStock: 25, barcode: "8901111222333" },
  { id: "iv6", sku: "GHE-AMU-500", name: "Amul Ghee 500ml", category: "Oil, Ghee & Masala", unit: "Bottle", purchasePrice: 295, sellingPrice: 325, stock: 3, minStock: 10, barcode: "8901234000012" },
  { id: "iv7", sku: "MAS-CAT-100", name: "Catch Coriander Powder 100g", category: "Oil, Ghee & Masala", unit: "Packet", purchasePrice: 24, sellingPrice: 32, stock: 0, minStock: 20, barcode: "8901058222014" },
  { id: "iv8", sku: "SLT-TAT-1K", name: "Tata Salt 1kg", category: "Oil, Ghee & Masala", unit: "Packet", purchasePrice: 22, sellingPrice: 29, stock: 210, minStock: 40, barcode: "8901058000199" },
];

export const stockMovements: StockMovement[] = [
  { id: "sm1", date: "22 Jul 2026 10:24", product: "Aashirvaad Atta 5kg", type: "Sale", qty: -2, balance: 120, reference: "INV-2025-0042" },
  { id: "sm2", date: "22 Jul 2026 09:00", product: "Fortune Sunflower Oil 1L", type: "Purchase", qty: 60, balance: 60, reference: "PO-2025-0022" },
  { id: "sm3", date: "21 Jul 2026 14:10", product: "Hathi Mustard Oil 1L", type: "Sale", qty: -5, balance: 90, reference: "INV-2025-0041" },
  { id: "sm4", date: "20 Jul 2026 11:20", product: "Aashirvaad Atta 5kg", type: "Purchase", qty: 40, balance: 122, reference: "PO-2025-0021" },
  { id: "sm5", date: "18 Jul 2026 16:45", product: "Amul Ghee 500ml", type: "Sale", qty: -6, balance: 3, reference: "INV-2025-0038" },
  { id: "sm6", date: "18 Jul 2026 09:00", product: "Tata Salt 1kg", type: "Purchase", qty: 100, balance: 210, reference: "PO-2025-0020" },
];

export const expenses: Expense[] = [
  { id: "e1", date: "22 Jul 2026", category: "Rent", description: "Shop rent — Jul", amount: 35000, paidVia: "Bank" },
  { id: "e2", date: "21 Jul 2026", category: "Electricity", description: "BESCOM bill", amount: 4820, paidVia: "UPI" },
  { id: "e3", date: "20 Jul 2026", category: "Salaries", description: "Staff salary — Ramesh", amount: 18000, paidVia: "Bank" },
  { id: "e4", date: "19 Jul 2026", category: "Fuel", description: "Delivery scooter fuel", amount: 1400, paidVia: "Cash" },
  { id: "e5", date: "18 Jul 2026", category: "Transportation", description: "Tempo hire — bulk purchase", amount: 2500, paidVia: "Cash" },
  { id: "e6", date: "17 Jul 2026", category: "Marketing", description: "Local flyer printing", amount: 3200, paidVia: "UPI" },
  { id: "e7", date: "15 Jul 2026", category: "Office Expenses", description: "Stationery & receipt rolls", amount: 890, paidVia: "Cash" },
  { id: "e8", date: "12 Jul 2026", category: "Miscellaneous", description: "Cleaning supplies", amount: 620, paidVia: "Cash" },
];

export const expenseCategories = ["Rent", "Electricity", "Salaries", "Fuel", "Transportation", "Office Expenses", "Marketing", "Miscellaneous"];

export const cashTxns: CashTxn[] = [
  { id: "ct1", date: "22 Jul 2026", type: "Receipt", account: "UPI", party: "Aarav Sharma", amount: 865, note: "INV-2025-0042 paid" },
  { id: "ct2", date: "22 Jul 2026", type: "Payment", account: "HDFC Bank", party: "Adani Wilmar Ltd", amount: 5000, note: "PO-2025-0022 partial" },
  { id: "ct3", date: "21 Jul 2026", type: "Receipt", account: "Cash", party: "Meera Iyer", amount: 500, note: "INV-2025-0041 partial" },
  { id: "ct4", date: "21 Jul 2026", type: "Payment", account: "UPI", party: "BESCOM", amount: 4820, note: "Electricity bill" },
  { id: "ct5", date: "20 Jul 2026", type: "Payment", account: "HDFC Bank", party: "ITC Aashirvaad", amount: 8904, note: "PO-2025-0021 full" },
  { id: "ct6", date: "20 Jul 2026", type: "Receipt", account: "UPI", party: "Kabir Singh", amount: 360, note: "Retail sale" },
];

export const accounts = [
  { id: "ac1", name: "Cash in Hand", type: "Cash", opening: 12000, current: 8480 },
  { id: "ac2", name: "HDFC Current A/c", type: "Bank", opening: 240000, current: 226096 },
  { id: "ac3", name: "SBI Savings", type: "Bank", opening: 45000, current: 45000 },
  { id: "ac4", name: "UPI Wallet", type: "UPI", opening: 5000, current: 12405 },
];

export const topSelling = [
  { name: "Aashirvaad Atta 5kg", qty: 142, revenue: 33228 },
  { name: "Hathi Mustard Oil 1L", qty: 118, revenue: 21712 },
  { name: "Amul Ghee 500ml", qty: 96, revenue: 31200 },
  { name: "India Gate Basmati 5kg", qty: 74, revenue: 27084 },
  { name: "Tata Salt 1kg", qty: 260, revenue: 7540 },
];

export const monthlyProfit = [
  { month: "Feb", revenue: 384000, expenses: 218000, profit: 166000 },
  { month: "Mar", revenue: 412000, expenses: 224000, profit: 188000 },
  { month: "Apr", revenue: 398000, expenses: 231000, profit: 167000 },
  { month: "May", revenue: 456000, expenses: 246000, profit: 210000 },
  { month: "Jun", revenue: 484000, expenses: 258000, profit: 226000 },
  { month: "Jul", revenue: 512000, expenses: 271000, profit: 241000 },
];

export const paymentStatusTone = (s: PaymentStatus): "success" | "warning" | "info" | "danger" => {
  switch (s) {
    case "Paid": return "success";
    case "Partial": return "info";
    case "Unpaid": return "warning";
    case "Overdue": return "danger";
  }
};

export { rupees };
