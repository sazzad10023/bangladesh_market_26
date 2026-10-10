import Link from "next/link";

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
  yesterday: number;
  lastWeek: number;
  lastMonth: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const ProductSections = async () => {
  const res = await fetch(
    "https://openapi.programming-hero.com/api/bazardor/products"
  );

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  const products: Product[] = await res.json();

  const risers = products
    .filter((product) => product.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((product) => product.change.dir === "down")
    .sort((a, b) => a.change.pct - b.change.pct)
    .slice(0, 6);

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("bn-BD").format(value);
  };

  const getUnit = (unit: string) => {
    if (unit === "kg") return "প্রতি কেজি";
    if (unit === "litre") return "প্রতি লিটার";
    if (unit === "dozen") return "প্রতি ডজন";
    if (unit === "piece") return "প্রতি পিস";

    return `প্রতি ${unit}`;
  };

  const getChangeText = (product: Product) => {
    if (product.change.dir === "up") {
      return `▲ ${formatNumber(product.change.pct)}%`;
    }

    if (product.change.dir === "down") {
      return `▼ ${formatNumber(Math.abs(product.change.pct))}%`;
    }

    return "— ০.০%";
  };

  const getChangeStyle = (dir: Product["change"]["dir"]) => {
    if (dir === "up") return "bg-green-50 text-green-600";
    if (dir === "down") return "bg-red-50 text-red-600";

    return "bg-gray-100 text-gray-500";
  };

  const ProductCard = ({ product }: { product: Product }) => {
    return (
      <Link
        href={`/product/${product.id}`}
        className="group block rounded-xl border border-gray-200 bg-white p-3 transition-all duration-200 hover:border-green-200 hover:shadow-sm"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-[48px] w-[48px] shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[27px]">
            {product.image}
          </div>

          <div className="min-w-0">
            <h3 className="truncate text-[15px] font-semibold leading-tight text-gray-900">
              {product.nameBn}
            </h3>

            <p className="mt-1 text-[10px] text-gray-500">
              {getUnit(product.unit)}
            </p>
          </div>
        </div>

        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="text-[10px] leading-none text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-[17px] font-bold leading-none text-gray-900">
              {formatNumber(product.today)}
              <span className="ml-1 text-[11px] font-medium text-gray-700">
                টাকা
              </span>
            </p>
          </div>

          <span
            className={`shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold leading-none ${getChangeStyle(
              product.change.dir
            )}`}
          >
            {getChangeText(product)}
          </span>
        </div>
      </Link>
    );
  };

  return (
    <main className=" container mx-auto w-full max-w-6xl px-3 py-8 sm:px-4">
      <section>
        <div className="mb-4">
          <h2 className="text-[20px] font-bold text-gray-900 sm:text-[22px]">
            <span className="mr-2 text-green-600">▲</span>
            আজ দাম বেড়েছে
          </h2>

          <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
            আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি বেড়েছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {risers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-[20px] font-bold text-gray-900 sm:text-[22px]">
            <span className="mr-2 text-red-600">▼</span>
            আজ দাম কমেছে
          </h2>

          <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
            আজকের বাজারে যেসব পণ্যের দাম সবচেয়ে বেশি কমেছে
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {fallers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section className="mt-10">
        <div className="mb-4">
          <h2 className="text-[20px] font-bold text-gray-900 sm:text-[22px]">
            সব পণ্য
          </h2>

          <p className="mt-1 text-[12px] text-gray-500 sm:text-[13px]">
            সব পণ্যের বর্তমান বাজারদর এক নজরে দেখুন।
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </main>
  );
};

export default ProductSections;