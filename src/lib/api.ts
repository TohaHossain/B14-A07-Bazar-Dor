export type Product = {
  id: string | number;
  slug: string;
  name: string;
  category: string;
  categoryName?: string;
  emoji: string;
  unit: string;
  price: number;
  change: number;
  description: string;
  markets: { name: string; price: number; range?: string }[];
};

export type Category = { slug: string; name: string; icon: string };

const API = "https://openapi.programming-hero.com/api/bazardor";

const fallback: Product[] = [
  ["1", "miniket-chal", "মিনিকেট চাল", "chal", "🍚", "প্রতি কেজি", 78, 2.1],
  ["2", "swarnamashi-chal", "স্বর্ণমাশী চাল", "chal", "🍚", "প্রতি কেজি", 68, -1.4],
  ["3", "ilish-mach", "ইলিশ মাছ", "mach", "🐟", "প্রতি কেজি", 1450, 4.2],
  ["4", "rui-mach", "রুই মাছ", "mach", "🐟", "প্রতি কেজি", 380, -2.9],
  ["5", "peyaj", "পেঁয়াজ", "sobji", "🧅", "প্রতি কেজি", 72, -3.1],
  ["6", "alu", "আলু", "sobji", "🥔", "প্রতি কেজি", 48, 1.8],
  ["7", "begun", "বেগুন", "sobji", "🍆", "প্রতি কেজি", 65, 0],
  ["8", "dim", "ডিম", "dim", "🥚", "প্রতি ডজন", 155, 2.2],
  ["9", "soybean-tel", "সয়াবিন তেল", "tel", "🫗", "প্রতি লিটার", 190, -1.2],
  ["10", "morich", "কাঁচা মরিচ", "moshla", "🌶️", "প্রতি কেজি", 140, 5.1],
  ["11", "dudh", "তরল দুধ", "dairy", "🥛", "প্রতি লিটার", 105, 0.5],
  ["12", "murgi", "ব্রয়লার মুরগি", "mangsho", "🍗", "প্রতি কেজি", 210, -2.4]
].map(([id, slug, name, category, emoji, unit, price, change]) => ({
  id: id as string, slug: slug as string, name: name as string, category: category as string,
  emoji: emoji as string, unit: unit as string, price: price as number, change: change as number,
  description: "আজকের বাজারদরের একটি সম্ভাব্য চিত্র। বাজারভেদে দামে পার্থক্য হতে পারে।",
  markets: ["কারওয়ান বাজার", "মিরপুর বাজার", "মোহাম্মদপুর বাজার"].map((market, i) => ({ name: market, price: (price as number) + (i - 1) * 3 }))
}));

const emojis: Record<string, string> = { chal: "🍚", sobji: "🥬", mach: "🐟", dim: "🥚", tel: "🫗", moshla: "🌶️", dairy: "🥛", mangsho: "🍗" };
const asNumber = (value: unknown) => Number(String(value ?? 0).replace(/[০-৯]/g, d => "০১২৩৪৫৬৭৮৯".indexOf(d).toString()).replace(/[^\d.]/g, "")) || 0;

function normalize(raw: any, index = 0): Product {
  const price = asNumber(raw?.price ?? raw?.current_price ?? raw?.avg_price ?? raw?.today_price);
  const category = raw?.category?.slug ?? raw?.category_slug ?? raw?.category ?? "sobji";
  const slug = String(raw?.slug ?? raw?.id ?? `product-${index}`);
  return {
    id: raw?.id ?? slug, slug, name: raw?.name ?? raw?.title ?? "বাজারের পণ্য", category,
    categoryName: raw?.category?.name, emoji: raw?.emoji ?? raw?.icon ?? emojis[category] ?? "🛒",
    unit: raw?.unit ?? raw?.unit_name ?? "প্রতি কেজি", price,
    change: Number(raw?.change ?? raw?.price_change ?? raw?.percentage_change ?? 0),
    description: raw?.description ?? "আজকের বাজারদরের একটি সম্ভাব্য চিত্র। বাজারভেদে দামে পার্থক্য হতে পারে।",
    markets: raw?.markets ?? raw?.market_prices ?? []
  };
}

async function request(path: string) {
  try {
    const res = await fetch(`${API}${path}`, { next: { revalidate: 300 } });
    if (!res.ok) throw new Error("API unavailable");
    const json = await res.json();
    return json?.data ?? json?.products ?? json;
  } catch { return null; }
}

export async function getProducts(): Promise<Product[]> {
  const data = await request("/products");
  const rows = Array.isArray(data) ? data : data?.products;
  return Array.isArray(rows) && rows.length ? rows.map(normalize) : fallback;
}
export async function getCategories(): Promise<Category[]> {
  const data = await request("/categories");
  const rows = Array.isArray(data) ? data : data?.categories;
  if (!Array.isArray(rows) || !rows.length) return ["chal", "sobji", "mach", "dim", "tel", "moshla"].map(slug => ({ slug, name: ({ chal: "চাল", sobji: "সবজি", mach: "মাছ", dim: "ডিম", tel: "তেল", moshla: "মসলা" }[slug] ?? slug), icon: emojis[slug] }));
  return rows.map((row: any) => ({ slug: String(row.slug ?? row.id ?? row.name), name: row.name ?? row.title, icon: row.icon ?? emojis[row.slug] ?? "🛒" }));
}
export async function getCategoryProducts(slug: string) {
  const products = await getProducts();
  return products.filter(product => product.category === slug || product.categoryName === slug);
}
export async function getProduct(slug: string) {
  const data = await request(`/products/${slug}`);
  if (data && !Array.isArray(data)) return normalize(data);
  const products = await getProducts();
  return products.find(product => product.slug === slug || String(product.id) === slug) ?? null;
}
export const bn = (value: number) => new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 1 }).format(value);
