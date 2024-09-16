import React from "react";
import "remixicon/fonts/remixicon.css";
import Link from "next/link";
const Page = () => {
  return (
    <div className="w-full h-screen flex items-center justify-center bg-gray-900">
      <div className=" sm:py-14 sm:px-28 py-5 h-5/6 sm:border-[1px] border-gray-800 flex flex-col items-center justify-center rounded-xl gap-5">
        <i className=" p-5 border border-gray-400 rounded-full text-6xl text-white ri-lock-line"></i>
        <h6 className="text-xl font-medium text-white ">Trouble logging in?</h6>
        <p className=" sm:text-base text-sm text-white">
          Enter your email and we&#39;ll send you <br />a link to get back into
          your account.
        </p>
        <input
          className="border text-gray-900 outline-none text-base rounded-lg w-64 py-2 px-3"
          placeholder="Email"
          name="email"
          type="email"
        />
        <button className=" py-2 w-64 font-medium rounded-lg border-none bg-gray-200 text-gray-900">
          Send Code!
        </button>
        <div className="flex items-center gap-5">
          <div className="w-20 h-[2px] bg-[#c3c3c3]"></div>
          <h6 className=" text-white">OR</h6>
          <div className="w-20 h-[2px] bg-[#c3c3c3]"></div>
        </div>
        <Link
          className="w-64 font-medium text-sm no-underline py-2 rounded-lg text-white text-center bg-[#4CB5F9]"
          href="/auth/signup"
        >
          Create New Account
        </Link>
        <Link
          className="w-64 font-medium text-sm no-underline py-2 text-center rounded-lg bg-[#5851DB] text-white"
          href="/auth/signin"
        >
          Back to Login
        </Link>
      </div>
    </div>
  );
};

export default Page;
