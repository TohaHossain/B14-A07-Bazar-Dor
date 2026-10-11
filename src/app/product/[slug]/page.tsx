import { notFound } from "next/navigation";
import { getProduct, bn } from "@/lib/api";
import AuthGuard from "@/components/AuthGuard";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; const product = await getProduct(slug); if (!product) notFound();
  const prices = product.markets.length ? product.markets.map(m => m.price) : [product.price - 4, product.price, product.price + 5];
  const markets = product.markets.length ? product.markets : ["কারওয়ান বাজার", "মিরপুর বাজার", "মোহাম্মদপুর বাজার"].map((name, i) => ({ name, price: prices[i] }));
  return <AuthGuard><div className="container details"><p className="breadcrumb">হোম / {product.category} / {product.name}</p><section className="detail-hero"><span className="detail-emoji">{product.emoji}</span><div><span className="category-pill">{product.categoryName || product.category}</span><h1>{product.name}</h1><p>{product.description}</p><small>{product.unit}</small></div></section>
    <section><h2>দামের সারসংক্ষেপ</h2><div className="summary-grid"><Summary label="সর্বনিম্ন দাম" value={Math.min(...prices)} /><Summary label="গড় দাম" value={Math.round(prices.reduce((a, b) => a + b, 0) / prices.length)} /><Summary label="সর্বোচ্চ দাম" value={Math.max(...prices)} /></div></section>
    <section className="market-section"><h2>বাজারভিত্তিক আজকের দাম</h2><div className="market-list">{markets.map((m, i) => <div key={m.name}><span><b>{m.name}</b><small>{product.unit}</small></span><strong>{bn(m.price)} টাকা</strong><span className="change flat">— ০.০%</span></div>)}</div></section>
  </div></AuthGuard>;
}
function Summary({ label, value }: { label: string; value: number }) { return <div className="summary-card"><small>{label}</small><strong>{bn(value)} টাকা</strong></div>; }
