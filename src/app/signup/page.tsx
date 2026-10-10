"use client";

import { authClient } from "@/lib/auth-client";
import { redirect } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const SignInpage = () => {
    const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const user = Object.fromEntries(formData.entries()) as {
            name: string;
            email: string;
            password: string;
            confirmPassword: string;
        };

        if (user.password !== user.confirmPassword) {
            toast.error("দুইটি পাসওয়ার্ড একই নয়।");
            return;
        }

        
        const { data, error } = await authClient.signUp.email({
            name: user.name,
            email: user.email,
            password: user.password,
            callbackURL: "/",
        });

       
        if (data) {
            toast.success("সফলভাবে অ্যাকাউন্ট তৈরি হয়েছে।");
            redirect("/signin");
        }

      
        if (error) {
            console.log(error)
    if (error.code === "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL") {
        toast.error("এই ইমেইল দিয়ে ইতিমধ্যে একটি অ্যাকাউন্ট আছে।");
    } else {
        toast.error("অ্যাকাউন্ট তৈরি করতে সমস্যা হয়েছে।");
    }
}
    };

    const handleGoogleSignIn = async () => {
        try {
            toast.loading("Google দিয়ে সাইন ইন করা হচ্ছে...", {
                id: "google-login",
            });

            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (error) {
            console.log("GOOGLE ERROR:", error);

            toast.error("Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।", {
                id: "google-login",
            });
        }
    };

    const handleGithubSignIn = async () => {
        try {
            toast.loading("GitHub দিয়ে সাইন ইন করা হচ্ছে...", {
                id: "github-login",
            });

            await authClient.signIn.social({
                provider: "github",
                callbackURL: "/",
            });
        } catch (error) {
            console.log("GITHUB ERROR:", error);

            toast.error("GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।", {
                id: "github-login",
            });
        }
    };

    return (
        <div className="min-h-[calc(100vh-45px)] bg-[#f3f8f4] px-4 py-10">
            <div className="mx-auto flex w-full max-w-[400px] flex-col items-center">
             
                <div className="mb-6 text-center">
                    <h2 className="text-[26px] font-bold text-gray-900">
                        অ্যাকাউন্ট তৈরি করুন
                    </h2>

                    <p className="mt-1 text-[13px] text-gray-500">
                        বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                    </p>
                </div>

               
                <div className="w-full rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
                    <form onSubmit={onSubmit}>
                        <fieldset>
                       
                            <label className="mb-2 block text-[13px] font-medium text-gray-800">
                                নাম
                            </label>

                            <input
                                type="text"
                                name="name"
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                                placeholder="যেমন: রহিম উদ্দিন"
                            />

                            <label className="mb-2 mt-4 block text-[13px] font-medium text-gray-800">
                                ইমেইল
                            </label>

                            <input
                                type="email"
                                name="email"
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                                placeholder="you@example.com"
                            />

                           
                            <label className="mb-2 mt-4 block text-[13px] font-medium text-gray-800">
                                পাসওয়ার্ড
                            </label>

                            <input
                                type="password"
                                name="password"
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                                placeholder="কমপক্ষে ৮ অক্ষর"
                            />

                          
                            <label className="mb-2 mt-4 block text-[13px] font-medium text-gray-800">
                                পাসওয়ার্ড নিশ্চিত করুন
                            </label>

                            <input
                                type="password"
                                name="confirmPassword"
                                className="h-10 w-full rounded-lg border border-gray-200 bg-white px-3 text-[13px] text-gray-800 outline-none transition focus:border-green-600 focus:ring-1 focus:ring-green-100"
                                placeholder="আবার লিখুন"
                            />

                            <button
                                type="submit"
                                className="mt-4 h-10 w-full rounded-lg bg-green-600 text-[13px] font-semibold text-white shadow-sm transition hover:bg-green-700"
                            >
                                অ্যাকাউন্ট তৈরি করুন
                            </button>
                        </fieldset>
                    </form>

                    
                    <div className="my-5 flex items-center gap-3">
                        <div className="h-px flex-1 bg-gray-200" />

                        <span className="text-[11px] text-gray-500">
                            অথবা
                        </span>

                        <div className="h-px flex-1 bg-gray-200" />
                    </div>

                  
                    <div className="flex gap-2">
                        
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <svg
                                aria-label="Google logo"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 512 512"
                            >
                                <g>
                                    <path
                                        d="m0 0H512V512H0"
                                        fill="#fff"
                                    />

                                    <path
                                        fill="#34a853"
                                        d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
                                    />

                                    <path
                                        fill="#4285f4"
                                        d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
                                    />

                                    <path
                                        fill="#fbbc02"
                                        d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
                                    />

                                    <path
                                        fill="#ea4335"
                                        d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
                                    />
                                </g>
                            </svg>

                            Google দিয়ে চালিয়ে যান
                        </button>

                       
                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            className="flex h-10 flex-1 items-center justify-center gap-2 rounded-lg border border-gray-200 bg-white px-2 text-[11px] font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <svg
                                aria-label="GitHub logo"
                                width="16"
                                height="16"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    fill="#18181b"
                                    d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                                />
                            </svg>

                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    
                    <p className="mt-5 text-center text-[12px] text-gray-500">
                        অ্যাকাউন্ট আছে?{" "}
                        <a
                            href="/signin"
                            className="font-medium text-green-600 hover:text-green-700"
                        >
                            সাইন ইন করুন
                        </a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignInpage;