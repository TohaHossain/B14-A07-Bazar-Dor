import Link from "next/link";
import { getProducts } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

export default async function Home() {
  const products = await getProducts();
  const risers = [...products].sort((a, b) => b.change - a.change).slice(0, 6);
  const fallers = [...products].sort((a, b) => a.change - b.change).slice(0, 6);
  return <><section className="hero"><div className="container hero-content"><div><p className="eyebrow">আজকের বাজারদর • প্রতিদিন হালনাগাদ</p><h1>বাজারের সঠিক দাম,<br /><i>এক নজরে।</i></h1><p>নিত্যপ্রয়োজনীয় পণ্যের বর্তমান বাজারদর জানুন সহজে। বুঝে কিনুন, সাশ্রয়ে থাকুন।</p><Link className="button" href="#সব-পণ্য">সব পণ্যের দাম দেখুন <span>→</span></Link></div><div className="hero-art"><span>🍅</span><span>🥬</span><span>🐟</span><img src="/bazar-hero.png" alt="বাজারের ব্যাগ" /></div></div></section>
    <section className="section muted"><div className="container"><SectionHeading title="আজ দাম বেড়েছে ▲" text="যেসব পণ্যের দাম আজ ঊর্ধ্বমুখী" /><div className="product-grid">{risers.map(p => <ProductCard product={p} key={p.id} />)}</div></div></section>
    <section className="section"><div className="container"><SectionHeading title="আজ দাম কমেছে ▼" text="যেসব পণ্যে আজ কিছুটা স্বস্তি" /><div className="product-grid">{fallers.map(p => <ProductCard product={p} key={p.id} />)}</div></div></section>
    <section className="section" id="সব-পণ্য"><div className="container"><SectionHeading title="সব পণ্য" text="আপনার প্রতিদিনের প্রয়োজনীয় পণ্যের বাজারদর" /><div className="product-grid">{products.map(p => <ProductCard product={p} key={p.id} />)}</div></div></section>
  </>;
}
function SectionHeading({ title, text }: { title: string; text: string }) { return <div className="section-heading"><div><h2>{title}</h2><p>{text}</p></div><Link href="/category/sobji">সব দেখুন →</Link></div>; }
