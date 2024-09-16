"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { asyncSignupUser } from "@/store/Actions/userActions";

const Page = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const router = useRouter();
  const SignUp = async () => {
    const data = { email, username, name, password };
    dispatch(asyncSignupUser(data));
    router.push("/");
  };
  return (
    <div className=" h-screen w-full flex items-center justify-center bg-gray-900">
      <div className="h-full w-1/2">
        <div className="w-full h-full py-5 px-12 flex flex-col items-center justify-center">
          <h6 className=" text-2xl mb-4 font-medium w-64 text-left text-white">
            Sign<span className="text-[#5851DB]">Up</span>
          </h6>

          <div className="my-2 flex flex-col">
            <label className=" text-white">Email</label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="email"
              placeholder="Enter Your Email"
            />
          </div>

          <div className="my-2 flex flex-col">
            <label className=" text-white">Name</label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="text"
              placeholder="Enter Your Name"
            />
          </div>
          <div className="my-2 flex flex-col">
            <label className=" text-white">UserName</label>
            <input
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="text"
              placeholder="Enter Your UserName"
            />
          </div>

          <div className="mb-3 mt-3 flex flex-col">
            <label className=" text-white">Password</label>
            <input
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              className="w-64 px-2 py-1 outline-none border rounded-sm mt-1 bg-gray-800 text-white"
              type="password"
              placeholder="Enter Your Password"
            />
          </div>

          <button
            className="mt-3 w-64 bg-[#5851DB] text-white py-2 rounded-md border-none font-medium"
            onClick={(e) => {
              e.preventDefault();
              SignUp();
            }}
          >
            SignUp
          </button>
          <h5 className=" text-base mt-6 text-white w-64 flex items-center justify-center">
            Already have an account?
            <Link
              className=" no-underline text-[#5851DB] font-medium"
              href="/auth/signin"
            >
              Login
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Page;
