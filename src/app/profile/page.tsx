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
    <div className="mx-auto max-w-4xl px-4 py-8">
      {/* Page Heading */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          আমার প্রোফাইল
        </h1>

        <p className="mt-1 text-sm text-gray-500">
          আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
        </p>
      </div>

      {/* Profile Card */}
      <div className="flex flex-nowrap items-center justify-between rounded-2xl border border-gray-200 bg-white px-7 py-6">
        {/* User */}
        <div className="flex min-w-0 items-center gap-5">
          {/* Profile Image */}
          <div className="h-[72px] w-[72px] shrink-0 overflow-hidden rounded-2xl bg-gray-100">
            <Image
              alt="User Avatar"
              src={user?.image as string}
              width={72}
              height={72}
              className="h-full w-full object-cover"
            />
          </div>

          {/* User Info */}
          <div className="min-w-0">
            <h2 className="truncate text-xl font-semibold text-gray-900">
              {user?.name}
            </h2>

            <p className="mt-1 truncate text-sm text-gray-500">
              {user?.email}
            </p>
          </div>
        </div>

        {/* Sign Out */}
        <button
          onClick={handleSignout}
          className="ml-6 shrink-0 rounded-lg border border-red-200 px-5 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-600 hover:text-white"
        >
          সাইন আউট
        </button>
      </div>

      {/* Information Card */}
      <div className="mt-6 rounded-2xl border border-gray-200 bg-white p-7">
        <h2 className="text-lg font-semibold text-gray-900">
          তথ্য
        </h2>

        <form onSubmit={handleUpdateProfile} className="mt-6">
          <fieldset>
            {/* Name */}
            <label className="mb-2 block text-sm font-medium text-gray-700">
              নাম
            </label>

            <input
              name="name"
              type="text"
              defaultValue={user?.name || ""}
              className="h-12 w-full rounded-lg border border-gray-300 px-3 text-sm text-gray-900 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-600"
              placeholder="Name"
            />

            {/* Update Button */}
            <button
              type="submit"
              className="mt-5 h-12 w-full rounded-lg bg-green-600 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700"
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