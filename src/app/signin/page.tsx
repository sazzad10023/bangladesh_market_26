"use client";

import { authClient } from "@/lib/auth-client";
import React from "react";

const page = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);

    const user = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
    };

    console.log(user);

    const { data, error } = await authClient.signIn.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <form onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold text-center">সাইন ইন</h2>

        <p className="text-[14px]">
          বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
        </p>

        <br />

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">ইমেইল</label>

          <input
            type="email"
            name="email"
            className="input"
            placeholder="Email"
          />

          <label className="label">পাসওয়ার্ড</label>

          <input
            type="password"
            name="password"
            className="input"
            placeholder="কমপক্ষে ৮ অক্ষর"
          />

          <button
            type="submit"
            className="btn btn-neutral mt-4 bg-green-600"
          >
            সাইন ইন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default page;