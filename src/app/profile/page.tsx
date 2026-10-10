
"use client";

import { authClient } from "@/lib/auth-client";
import Image from "next/image";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const ProfilePage = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignout = async () => {
    try {
      await authClient.signOut();

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
    } catch (error) {
      console.log("SIGN OUT ERROR:", error);

      toast.error("সাইন আউট করতে সমস্যা হয়েছে।");
      return;
    }

    redirect("/signin");
  };

  const handleUpdateProfile = async (
    e: React.SubmitEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const newUserData = Object.fromEntries(formData.entries()) as {
      name: string;
    };

    try {
      const { data, error } = await authClient.updateUser({
        ...newUserData,
      });

      if (error) {
        toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
        return;
      }

      if (data) {
        toast.success("প্রোফাইল সফলভাবে আপডেট হয়েছে।");
      }
    } catch (error) {
      console.log("UPDATE PROFILE ERROR:", error);
      toast.error("প্রোফাইল আপডেট করতে সমস্যা হয়েছে।");
    }
  };

  return (
    <div className="mx-auto w-full max-w-4xl px-3 py-5 sm:px-5 sm:py-8">
      <div className="mb-5 sm:mb-6">
        <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 sm:rounded-2xl sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-6 md:px-7">
        <div className="flex min-w-0 items-center gap-3 sm:gap-5">
          <div className="h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-gray-100 sm:h-[72px] sm:w-[72px] sm:rounded-2xl">
            <Image
              alt="User Avatar"
              src={user?.image as string}
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </div>

          <div className="min-w-0 flex-1">
            <h2 className="truncate text-base font-semibold text-gray-900 sm:text-xl">
              {user?.name}
            </h2>

            <p className="mt-1 break-all text-xs text-gray-500 sm:truncate sm:text-sm">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={handleSignout}
          className="w-full shrink-0 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white sm:ml-4 sm:w-auto sm:px-5"
        >
          সাইন আউট
        </button>
      </div>

      <div className="mt-4 rounded-xl border border-gray-200 bg-white p-4 sm:mt-6 sm:rounded-2xl sm:p-6 md:p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          তথ্য
        </h2>

        <form onSubmit={handleUpdateProfile} className="mt-5 sm:mt-6">
          <fieldset className="min-w-0">
            {/* Name */}
            <label className="mb-2 block text-sm font-medium text-gray-700">
              নাম
            </label>

            <input
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              className="h-11 w-full min-w-0 rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600 sm:h-12"
              placeholder="Name"
            />

            <button
              type="submit"
              className="mt-4 h-11 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 sm:mt-5 sm:h-12"
            >
              আপডেট
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default ProfilePage;
