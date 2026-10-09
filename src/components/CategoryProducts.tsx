"use client";

import { useState } from "react";
import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  category: string;
  categoryNameBn: string;
  categoryIcon: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const CategoryProducts = ({
  products,
}: {
  products: Product[];
}) => {
  const [sort, setSort] = useState("default");

  const sortedProducts = [...products].sort((a, b) => {
    if (sort === "low") {
      return a.today - b.today;
    }

    if (sort === "high") {
      return b.today - a.today;
    }

    return 0;
  });

  return (
    <>
      <section className="mt-4 flex h-[49px] items-center justify-end rounded-xl border border-gray-200 bg-white px-4 sm:px-5">
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-gray-500 sm:text-[11px]">
            সাজান
          </span>

          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="h-8 cursor-pointer rounded-md border border-gray-300 bg-white px-2.5 text-[10px] text-gray-700 outline-none sm:text-[11px]"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম কম থেকে বেশি</option>
            <option value="high">দাম বেশি থেকে কম</option>
          </select>
        </div>
      </section>

      <p className="mt-3 text-[10px] text-gray-500 sm:text-[11px]">
        মোট {sortedProducts.length}টি পণ্য দেখানো হচ্ছে
      </p>

      <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </>
  );
};

export default CategoryProducts;