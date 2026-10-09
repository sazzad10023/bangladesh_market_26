"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";

const SignInpage = () => {
  const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target);

    const user = Object.fromEntries(formData.entries()) as {
      name: string;
      email: string;
      password: string;
    };

    const { data, error } = await authClient.signUp.email({
      ...user,
      callbackURL: "/",
    });

    if (data) {
      console.log(data);
      redirect("/")
      
    }

    if (error) {
      console.log(error);
    }
  };

  return (
    <div className=" flex flex-col items-center justify-center mt-5">
      <form onSubmit={onSubmit}>
        <h2 className="text-2xl font-bold text-center">
          অ্যাকাউন্ট তৈরি করুন
        </h2>

        <p>বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।</p>

        <br />

        <fieldset className="fieldset bg-base-200 border-base-300 rounded-box w-xs border p-4">
          <label className="label">নাম</label>

          <input
            type="text"
            name="name"
            className="input"
            placeholder="নাম"
          />

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
            placeholder="পাসওয়ার্ড"
          />

          <label className="label">পাসওয়ার্ড নিশ্চিত করুন</label>

          <input
            type="password"
            className="input"
            placeholder="আবার লিখুন"
          />

          <button
            type="submit"
            className="btn btn-neutral mt-4 bg-green-600"
          >
            অ্যাকাউন্ট তৈরি করুন
          </button>
        </fieldset>
      </form>
    </div>
  );
};

export default SignInpage;