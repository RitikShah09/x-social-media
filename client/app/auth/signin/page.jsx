"use client";
import { asyncSigninUser } from "@/store/Actions/userActions";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";

const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const LogIn = async () => {
    const data = { email, password };
    dispatch(asyncSigninUser(data));
    router.push("/");
  };
  return (
    <div className=" h-screen w-full flex items-center justify-center rounded-sm overflow-hidden bg-gray-900">
      <div className="h-full sm:w-1/2 w-full">
        <div className="w-full h-full flex py-5 px-12 items-center flex-col justify-center">
          <div className="text-left w-64 ">
            <h6 className=" text-xl font-medium text-white">
              Welcome, <span className="text-[#5851DB]">Back</span>
            </h6>
            <p className=" text-sm text-white">
              Welcome back! Please enter your details.
            </p>
          </div>
          <div className="my-2 flex flex-col">
            <label className=" text-white">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="email"
              placeholder="Enter Your Email"
            />
          </div>

          <div className="mb-3 mt-3 flex flex-col">
            <label className=" text-white">Password</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>
          <button
            className=" my-3 w-64 font-medium border-none rounded-md py-2 px-0 bg-[#5851DB] text-white"
            onClick={LogIn}
          >
            Login
          </button>

          <div className="mb-3 mt-3 w-64 flex justify-center">
            <Link
              className=" mb-4 text no-underline text-white font-extralight"
              href="/auth/forgot"
            >
              Forgot Password?
            </Link>
          </div>
          <div className="mb-3 w-64 flex justify-center">
            <div className=" text-base text-white">
              Don&#39;t have an account?
              <Link
                className=" no-underline text-[#5851DB] font-medium"
                href="/auth/signup"
              >
                SignUp
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
