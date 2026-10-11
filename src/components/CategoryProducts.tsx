"use client";

import { useMemo, useState } from "react";
import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/api";

type SortOrder = "default" | "low" | "high";

const bengaliDigits = "০১২৩৪৫৬৭৮৯";

// API values are normalised in lib/api, but this keeps the comparison safe if
// a future API response supplies a Bengali-formatted price directly.
function numericPrice(value: unknown) {
  if (typeof value === "number") return value;
  const western = String(value ?? "").replace(/[০-৯]/g, (digit) => String(bengaliDigits.indexOf(digit)));
  const parsed = Number(western.replace(/[^\d.-]/g, ""));
  return Number.isFinite(parsed) ? parsed : 0;
}

export default function CategoryProducts({ products }: { products: Product[] }) {
  const [sort, setSort] = useState<SortOrder>("default");
  const sortedProducts = useMemo(() => {
    if (sort === "default") return products;
    return [...products].sort((left, right) => {
      const difference = numericPrice(left.price) - numericPrice(right.price);
      return sort === "low" ? difference : -difference;
    });
  }, [products, sort]);

  return <>
    <div className="toolbar">
      <p>{products.length}টি পণ্যের আজকের বাজারদর</p>
      <label htmlFor="category-sort">
        সাজান: <select className="sort-control" id="category-sort" value={sort} onChange={(event) => setSort(event.target.value as SortOrder)}>
          <option value="default">ডিফল্ট</option>
          <option value="low">দাম: কম থেকে বেশি</option>
          <option value="high">দাম: বেশি থেকে কম</option>
        </select>
      </label>
    </div>
    <div className="product-grid">
      {sortedProducts.map((product) => <ProductCard key={product.id} product={product} />)}
    </div>
  </>;
}
