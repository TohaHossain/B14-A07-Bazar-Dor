import Link from "next/link";
import CategoryProducts from "@/components/CategoryProducts";
import { getCategories, getCategoryProducts } from "@/lib/api";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const [categories, products] = await Promise.all([getCategories(), getCategoryProducts(slug)]);
  const category = categories.find((item) => item.slug === slug);

  if (!category || products.length === 0) {
    return <main className="container empty-state" aria-labelledby="category-empty-title">
      <span className="empty-icon" aria-hidden="true">🔎</span>
      <p className="eyebrow">৪০৪</p>
      <h1 id="category-empty-title">এই ক্যাটাগরিতে কোনো পণ্য পাওয়া যায়নি</h1>
      <p>আপনি যে পৃষ্ঠাটি খুঁজছেন, সেটি হয়তো নেই বা সরিয়ে নেওয়া হয়েছে।</p>
      <Link className="button button-primary" href="/">হোম পেজে ফিরে যান</Link>
    </main>;
  }

  return <main className="container category-page">
    <header className="category-heading">
      <span className="category-icon" aria-hidden="true">{category.icon}</span>
      <div>
        <p className="eyebrow">ক্যাটাগরি</p>
        <h1>{category.name}</h1>
      </div>
    </header>
    <CategoryProducts products={products} />
  </main>;
}
