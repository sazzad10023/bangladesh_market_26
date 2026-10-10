
import { notFound } from "next/navigation";

interface Market {
  market: string;
  division: string;
  min: number;
  max: number;
}

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  categoryNameBn: string;
  unit: string;
  image: string;
  today: number;
  yesterday: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
  markets: Market[];
}

const ProductDetails = async ({
  params,
}: {
  params: Promise<{ productId: string }>;
}) => {
  const { productId } = await params;

  const res = await fetch(
    `https://openapi.programming-hero.com/api/bazardor/products/${productId}`
  );

  if (!res.ok) {
    notFound();
  }

  const product: Product = await res.json();

  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("bn-BD").format(value);
  };

  let lowestPrice = product.markets[0].min;
  let highestPrice = product.markets[0].max;

  let totalPrice = 0;

  for (const market of product.markets) {
    // Lowest price
    if (market.min < lowestPrice) {
      lowestPrice = market.min;
    }

    // Highest price
    if (market.max > highestPrice) {
      highestPrice = market.max;
    }

    // Average price
    const marketAverage = (market.min + market.max) / 2;

    totalPrice = totalPrice + marketAverage;
  }

  const averagePrice = Math.round(
    totalPrice / product.markets.length
  );

  return (
    <main className="min-h-screen bg-[#f3f7f3]">
      <div className="container mx-auto max-w-6xl px-3 py-5 sm:px-4">

        {/* Product */}
        <section className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-3 min-[400px]:p-4 sm:flex-row sm:items-center sm:justify-between">

          <div className="flex min-w-0 items-center gap-3">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-[28px]">
              {product.image}
            </div>

            <div className="min-w-0 flex-1">
              <h1 className="break-words text-lg font-bold text-gray-900 sm:text-xl">
                {product.nameBn}
              </h1>

              <p className="mt-1 text-[15px] text-gray-500">
                প্রতি {product.unit} · {product.categoryNameBn}
              </p>

              <p className="mt-1 text-[13px] leading-5 text-gray-500 sm:text-[15px]">
                গতকালের তুলনায় আজ দাম{" "}
                {product.change.dir === "up"
                  ? "বেড়েছে"
                  : product.change.dir === "down"
                    ? "কমেছে"
                    : "পরিবর্তন হয়নি"}
              </p>
            </div>
          </div>

          <div className="w-full rounded-lg bg-[#f3f7f3] px-3 py-3 text-center sm:w-auto sm:shrink-0 sm:px-4">
            <p className="text-[15px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-1 text-xl font-bold text-gray-900">
              {formatNumber(product.today)}
            </p>

            <p className="text-[15px] text-gray-500">
              টাকা / {product.unit}
            </p>

            <p
              className={`mt-1 text-[12px] font-semibold ${
                product.change.dir === "up"
                  ? "text-red-600"
                  : product.change.dir === "down"
                    ? "text-green-600"
                    : "text-gray-500"
              }`}
            >
              {product.change.dir === "up"
                ? `▲ ${formatNumber(product.change.pct)}%`
                : product.change.dir === "down"
                  ? `▼ ${formatNumber(Math.abs(product.change.pct))}%`
                  : "— ০.০%"}
            </p>
          </div>
        </section>

        {/* Price Summary */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-3 min-[400px]:p-4">

          <h2 className="text-[17px] font-bold text-gray-900">
            দামের সারসংক্ষেপ
          </h2>

          <div className="mt-3 grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3">

            <div className="min-w-0 rounded-lg border border-gray-200 p-3">
              <p className="text-[15px] text-gray-500">
                সর্বনিম্ন দাম
              </p>

              <p className="mt-1 text-lg font-bold text-green-600">
                {formatNumber(lowestPrice)}{" "}
                <span className="text-[15px] font-medium">
                  টাকা
                </span>
              </p>

              <p className="text-[13px] leading-5 text-gray-500 sm:text-[15px]">
                সবচেয়ে কম দামের বাজার
              </p>
            </div>

            <div className="min-w-0 rounded-lg border border-gray-200 p-3">
              <p className="text-[15px] text-gray-500">
                সর্বোচ্চ দাম
              </p>

              <p className="mt-1 text-lg font-bold text-red-600">
                {formatNumber(highestPrice)}{" "}
                <span className="text-[15px] font-medium">
                  টাকা
                </span>
              </p>

              <p className="text-[13px] leading-5 text-gray-500 sm:text-[15px]">
                সবচেয়ে বেশি দামের বাজার
              </p>
            </div>

            <div className="min-w-0 rounded-lg border border-gray-200 p-3">
              <p className="text-[15px] text-gray-500">
                গড় দাম
              </p>

              <p className="mt-1 text-lg font-bold text-gray-900">
                {formatNumber(averagePrice)}{" "}
                <span className="text-[15px] font-medium">
                  টাকা
                </span>
              </p>

              <p className="text-[13px] leading-5 text-gray-500 sm:text-[15px]">
                প্রতি কেজি-এর হিসাবে
              </p>
            </div>

          </div>
        </section>

        {/* Markets */}
        <section className="mt-4 rounded-xl border border-gray-200 bg-white p-3 min-[400px]:p-4">

          <h2 className="text-[17px] font-bold text-gray-900">
            বাজারভিত্তিক আজকের দাম
          </h2>

          <div className="mt-3 overflow-x-auto rounded-lg border border-gray-200">

            <table className="w-full min-w-[600px] text-left">

              <thead>
                <tr className="bg-gray-50">

                  <th className="whitespace-nowrap px-3 py-2 text-[15px] font-medium text-gray-500">
                    বাজার
                  </th>

                  <th className="whitespace-nowrap px-3 py-2 text-[15px] font-medium text-gray-500">
                    বিভাগ
                  </th>

                  <th className="whitespace-nowrap px-3 py-2 text-right text-[15px] font-medium text-gray-500">
                    সর্বনিম্ন
                  </th>

                  <th className="whitespace-nowrap px-3 py-2 text-right text-[15px] font-medium text-gray-500">
                    সর্বোচ্চ
                  </th>

                  <th className="whitespace-nowrap px-3 py-2 text-right text-[15px] font-medium text-gray-500">
                    গড়
                  </th>

                </tr>
              </thead>

              <tbody>
                {product.markets.map((market) => {
                  const average = Math.round(
                    (market.min + market.max) / 2
                  );

                  return (
                    <tr
                      key={`${market.market}-${market.division}`}
                      className="border-t border-gray-200"
                    >
                      <td className="whitespace-nowrap px-3 py-2.5 text-[15px] text-gray-700">
                        {market.market}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-[15px] text-gray-600">
                        {market.division}
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-right text-[15px] text-gray-700">
                        {formatNumber(market.min)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-right text-[15px] text-gray-700">
                        {formatNumber(market.max)} টাকা
                      </td>

                      <td className="whitespace-nowrap px-3 py-2.5 text-right text-[15px] text-gray-700">
                        {formatNumber(average)} টাকা
                      </td>
                    </tr>
                  );
                })}
              </tbody>

            </table>
          </div>
        </section>

      </div>
    </main>
  );
};

export default ProductDetails;
