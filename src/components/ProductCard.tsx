import Link from "next/link";
import type { Product } from "@/lib/api";
import { bn } from "@/lib/api";

export default function ProductCard({ product }: { product: Product }) {
  const rising = product.change > 0;
  return <Link href={`/product/${product.slug}`} className="product-card" aria-label={`${product.name} এর বিস্তারিত`}>
    <div className="product-top"><span className="product-emoji">{product.emoji}</span><span className="category-pill">{product.categoryName || product.category}</span></div>
    <h3>{product.name}</h3><p className="unit">{product.unit}</p>
    <div className="price-line"><div><small>আজকের দাম</small><strong>{bn(product.price)} টাকা</strong></div>
      <span className={`change ${rising ? "up" : product.change < 0 ? "down" : "flat"}`}>{rising ? "▲" : product.change < 0 ? "▼" : "—"} {bn(Math.abs(product.change))}%</span>
    </div>
  </Link>;
}
