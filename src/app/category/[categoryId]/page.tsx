import CategoryProducts from "@/components/CategoryProducts";
import { notFound } from "next/navigation";

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

const CategoryNews = async ({
  params,
}: {
  params: { categoryId: string };
}) => {
  const { categoryId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products?category=${categoryId}`
  );

  if (!res.ok) {
    notFound();
  }

  const data = await res.json();

  const categoryProducts: Product[] = data;

  if (categoryProducts.length === 0) {
    notFound();
  }

  const category = categoryProducts[0];

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("bn-BD").format(value);
  };

  return (
    <main className="min-h-screen bg-[#f3f7f3]">
      <div className="container mx-auto max-w-6xl px-3 py-5 sm:px-4">

        {/* Category Header */}
        <section className="rounded-xl border border-gray-200 bg-white px-4 py-4 sm:px-5">
          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[25px]">
              {category.categoryIcon}
            </div>

            <div className="min-w-0">
              <h1 className="text-[18px] font-bold leading-tight text-gray-900 sm:text-[20px]">
                {category.categoryNameBn}
              </h1>

              <p className="mt-0.5 text-[10px] text-gray-500 sm:text-[11px]">
                {formatNumber(categoryProducts.length)}
                টি পণ্যের আজকের দাম ও পরিবর্তন
              </p>
            </div>

          </div>
        </section>

        <CategoryProducts products={categoryProducts} />

      </div>
    </main>
  );
};

export default CategoryNews;