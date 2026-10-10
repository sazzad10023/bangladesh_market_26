
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const CategoryNav = ({ navs }: { navs: Navs[] }) => {
  const pathname = usePathname();

  return (
    <div className="flex h-[45px] items-center overflow-x-auto px-2 sm:px-3">
      <div className="flex gap-1 sm:gap-2">
        {navs.map((n) => (
          <Link
            key={n.id}
            href={`/category/${n.slug}`}
            className={`flex shrink-0 items-center gap-1 rounded-md px-2 py-2 text-[11px] sm:text-[12px] md:text-[14px] ${
              pathname === `/category/${n.slug}`
                ? "bg-[#009447] font-semibold text-white"
                : "text-gray-700 hover:bg-green-100 hover:text-[#009447]"
            }`}
          >
            <span>{n.icon}</span>
            <span>{n.nameBn}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CategoryNav;