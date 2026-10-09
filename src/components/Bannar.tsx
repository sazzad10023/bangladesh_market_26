import Image from 'next/image';
import React from 'react';

const Bannar = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div className=" container mx-auto w-full max-w-6xl px-3 sm:px-4">

      <div className="
        flex min-h-[200px] w-full
        items-center justify-between
        overflow-hidden
        rounded-2xl
        border border-gray-200
        bg-[#f8faf8]
        px-5 py-5
        sm:px-7
        md:min-h-[200px]
        md:px-10
      ">

        {/* Left Content */}
        <div className="z-10 flex max-w-[650px] flex-col items-start">

          {/* Date */}
          <span className="
            rounded-full
            bg-green-50
            px-3 py-1
            text-[9px] font-medium
            text-green-700
            sm:text-[10px]
            md:text-[11px]
          ">
            {date}
          </span>

          {/* Title */}
          <h2 className="
            mt-2
            text-[25px] font-bold leading-tight
            tracking-tight text-gray-900
            sm:text-[30px]
            md:text-[36px]
          ">
            আজকের বাজারের দাম এক নজরে
          </h2>

          {/* Description */}
          <p className="
            mt-3
            max-w-[620px]
            text-[10px] leading-5
            text-gray-500
            sm:text-[11px]
            md:text-[12px]
          ">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন- <br />সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>

          {/* Button */}
          <button className="
            mt-4
            rounded-md
            bg-green-600
            px-4 py-2
            text-[11px] font-semibold
            text-white
            shadow-sm
            transition-all
            hover:bg-green-700
            hover:shadow-md
            sm:px-5
            sm:py-2
            sm:text-[12px]
            md:text-[13px]
          ">
            সব পণ্য দেখুন
          </button>

        </div>

        {/* Right Image */}
        <div className="
          relative hidden
          h-[180px] w-[260px]
          shrink-0
          sm:block
          md:h-[190px]
          md:w-[300px]
        ">
          <Image
            src="/bazar-hero.png"
            alt="বাজার দর"
            fill
            priority
            className="object-contain"
          />
        </div>

      </div>
    </div>
  );
};

export default Bannar;