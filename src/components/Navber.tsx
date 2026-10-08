import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Marque from './Marque';

interface Navs {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navber = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories"
  );

  const data = await res.json();
  const navs: Navs[] = data;

  console.log(navs);

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full">

      {/* Header */}
      <div className="mx-auto flex min-h-[45px] max-w-[1100px] flex-col gap-3 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:py-0">

        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          <Image
            src="/logo-icon.png"
            alt="বাজার দর"
            width={30}
            height={30}
            priority
            className="h-[30px] w-[30px] rounded-md"
          />

          <div className="flex flex-col leading-none">
            <span className="text-[20px] font-bold text-gray-900 sm:text-[22px] md:text-[25px]">
              বাজার দর
            </span>

            <span className="mt-[3px] text-[10px] text-gray-500 sm:text-[11px] md:text-[12px]">
              {date}
            </span>
          </div>
        </div>

        {/* Auth */}
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <button className="rounded-md px-3 py-1.5 text-[13px] font-medium text-gray-800 transition-colors duration-300 hover:bg-green-600 hover:text-white sm:px-4 sm:py-2 sm:text-[14px] md:text-[16px]">
            সাইন ইন
          </button>

          <button className="rounded-md bg-green-600 px-3 py-1.5 text-[13px] font-semibold text-white shadow-sm hover:bg-green-700 sm:px-4 sm:py-2 sm:text-[14px] md:text-[16px]">
            সাইন আপ
          </button>
        </div>
      </div>

      {/* Categories */}
      <div className="mx-auto max-w-[1100px] border-y border-gray-100">

        <div className="flex h-[45px] items-center overflow-x-auto px-3 sm:px-4">
          <div className="flex shrink-0 gap-4 sm:gap-5">

            <Link
              href="/"
              className="flex shrink-0 items-center gap-1 text-[11px] text-gray-700 sm:text-[12px] md:text-[14px]"
            >
              <span>হোম</span>
            </Link>

            {navs.map((n, i) => (
              <Link
                key={i}
                href={`/category/${n.slug}`}
                className="flex shrink-0 items-center gap-1 text-[11px] text-gray-700 sm:text-[12px] md:text-[14px]"
              >
                <span>{n.icon}</span>
                <span>{n.nameBn}</span>
              </Link>
            ))}

          </div>
        </div>
      </div>

      {/* Marquee */}
      <Marque />

    </header>
  );
};

export default Navber;