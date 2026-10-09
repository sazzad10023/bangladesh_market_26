import Link from "next/link";

interface Product {
  id: number;
  slug: string;
  nameBn: string;
  unit: string;
  image: string;
  today: number;
  change: {
    dir: "up" | "down" | "flat";
    pct: number;
  };
}

const ProductCard = ({ product }: { product: Product }) => {
  const formatNumber = (value: number) => {
    return new Intl.NumberFormat("bn-BD").format(value);
  };

  const getUnit = (unit: string) => {
    switch (unit) {
      case "kg":
        return "প্রতি কেজি";

      case "litre":
        return "প্রতি লিটার";

      case "dozen":
        return "প্রতি ডজন";

      case "piece":
        return "প্রতি পিস";

      default:
        return `প্রতি ${unit}`;
    }
  };

  const getChangeText = () => {
    if (product.change.dir === "up") {
      return `▲ ${formatNumber(product.change.pct)}%`;
    }

    if (product.change.dir === "down") {
      return `▼ ${formatNumber(Math.abs(product.change.pct))}%`;
    }

    return "— ০.০%";
  };

  const getChangeStyle = () => {
    if (product.change.dir === "up") {
      return "bg-red-50 text-red-600";
    }

    if (product.change.dir === "down") {
      return "bg-green-50 text-green-600";
    }

    return "bg-gray-100 text-gray-500";
  };

  return (
    <Link href={`/product/${product.slug}`}>
      <div
        className="
          rounded-xl
          border
          border-gray-200
          bg-white
          p-3
          transition
          duration-200
          hover:border-green-200
          hover:shadow-sm
        "
      >

        {/* Product */}
        <div className="flex items-center gap-3">

          {/* Image / Emoji */}
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-lg
              bg-gray-50
              text-[23px]
            "
          >
            {product.image}
          </div>

          {/* Name */}
          <div className="min-w-0">

            <h2 className="truncate text-[14px] font-semibold text-gray-900">
              {product.nameBn}
            </h2>

            <p className="mt-0.5 text-[10px] text-gray-500">
              {getUnit(product.unit)}
            </p>

          </div>

        </div>

        {/* Bottom */}
        <div className="mt-4 flex items-end justify-between">

          {/* Price */}
          <div>

            <p className="text-[9px] text-gray-500">
              আজকের দাম
            </p>

            <p className="mt-0.5 text-[16px] font-bold text-gray-900">
              {formatNumber(product.today)}

              <span className="ml-1 text-[10px] font-medium">
                টাকা
              </span>
            </p>

          </div>

          {/* Change */}
          <span
            className={`
              rounded-full
              px-2
              py-1
              text-[9px]
              font-semibold
              ${getChangeStyle()}
            `}
          >
            {getChangeText()}
          </span>

        </div>

      </div>
    </Link>
  );
};

export default ProductCard;