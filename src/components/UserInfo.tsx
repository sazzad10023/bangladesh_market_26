"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

const handleSignout = async () => {
  try {
    await authClient.signOut();

    toast.success("সফলভাবে সাইন আউট হয়েছে।");
  } catch (error) {
    console.log("SIGN OUT ERROR:", error);

    toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
  }
};

  return (
    <div className="shrink-0">
      {user ? (
        <div className="flex items-center gap-3 rounded-2xl border border-gray-200 bg-white px-3 py-2 shadow-md">
          {/* Profile Image */}
          <Link href="/profile" className="shrink-0">
            <div className="avatar cursor-pointer">
              <div className="w-10 rounded-full ring-2 ring-green-600 ring-offset-2 ring-offset-white">
                <Image
                  src={user.image as string}
                  alt="User Avatar"
                  width={40}
                  height={40}
                  className="h-10 w-10 rounded-full object-cover"
                />
              </div>
            </div>
          </Link>

          {/* User Name */}
          <div className="min-w-0">
            <h2 className="whitespace-nowrap text-sm font-semibold text-gray-900">
              {user.name}
            </h2>
          </div>

          {/* Divider */}
          <div className="h-7 w-px shrink-0 bg-gray-200" />

          {/* Sign Out */}
          <button
            onClick={handleSignout}
            className="shrink-0 rounded-lg border border-red-100 bg-green-500 px-3 py-1.5 text-xs font-semibold text-white-600 transition hover:border-red-200 hover:bg-red-600 hover:text-white"
          >
            Sign out
          </button>
        </div>
      ) : (
        <div className="flex items-center gap-3 sm:gap-4 md:gap-6">
          <Link
            href="/signin"
            className="rounded-md px-3 py-1.5 text-[13px] font-medium text-gray-800 transition-colors duration-300 hover:bg-green-600 hover:text-white sm:px-4 sm:py-2 sm:text-[14px] md:text-[16px]"
          >
            সাইন ইন
          </Link>

          <Link
            href="/signup"
            className="rounded-md bg-green-600 px-3 py-1.5 text-[13px] font-semibold text-white shadow-sm hover:bg-green-700 sm:px-4 sm:py-2 sm:text-[14px] md:px-4 md:py-2 md:text-[16px]"
          >
            সাইন আপ
          </Link>
        </div>
      )}
    </div>
  );
};

export default UserInfo;