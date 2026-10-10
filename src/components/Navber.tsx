import Image from "next/image";
import Link from "next/link";
import Marque from "./Marque";
import UserInfo from "./UserInfo";

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

  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <header className="w-full">
      {/* Header */}
      <div className="container mx-auto flex min-h-[45px] max-w-6xl flex-col gap-3 px-3 py-2 sm:flex-row sm:items-center sm:justify-between sm:gap-0 sm:px-4 sm:py-0">
        {/* Logo + Brand */}
        <div className="flex items-center gap-2">
          {/* Logo */}
          <Link href="/" className="shrink-0">
            <Image
              src="/logo-icon.png"
              alt="বাজার দর"
              width={40}
              height={40}
              priority
              className="h-11 w-11 rounded-xl bg-[#009447]  p-1.5"
            />
          </Link>

          {/* Brand + Date */}
          <div className="flex flex-col">
            <Link href="/">
              <span className="text-[20px] font-bold leading-tight text-gray-900 sm:text-[22px]">
                বাজার দর
              </span>
            </Link>

            <span className="mt-1 text-[10px] text-gray-500 sm:text-[11px]">
              {date}
            </span>
          </div>
        </div>

        {/* User Info */}
        <UserInfo />
      </div>

      {/* Categories */}
      <div className="mx-auto max-w-6xl border-y border-gray-100">
        <div className="flex h-[45px] items-center overflow-x-auto px-3 sm:px-4">
          <div className="flex shrink-0 gap-4 sm:gap-5">
            {navs.map((n) => (
              <Link
                key={n.id}
                href={`/category/${n.slug}`}
                className="flex shrink-0 items-center gap-1 rounded-md px-3 py-2 text-[11px] text-gray-700 transition-colors hover:bg-green-100 hover:text-[#009447] sm:text-[12px] md:text-[14px]"
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