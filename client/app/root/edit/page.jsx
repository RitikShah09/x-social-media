"use client";
import React, { useState } from "react";
import XLayout from "@/components/XLayout";
import { useDispatch, useSelector } from "react-redux";
import axios from "@/utils/axios";
import { asyncCurrentUser } from "@/store/Actions/userActions";
import { useRouter } from "next/navigation";
const Page = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  const [username, setUserName] = useState(user?.username);
  const [name, setName] = useState(user?.name );
  const [email, setEmail] = useState(user?.email);
  const [bio, setBio] = useState(user?.bio);
  const updateUser = async () => {
    const dets = { username, name, email, bio };
    const { data } = await axios.post("/user/update", dets);
    await dispatch(asyncCurrentUser());
    router.back();
  };
  return (
    <XLayout>
      <div className=" w-full h-full flex gap-14 flex-col items-center justify-center">
        <div className="sm:w-3/5 flex items-center justify-between gap-2  w-4/5">
          <img
            className=" h-14 w-14 rounded-full object-cover"
            src={user?.avatar?.url}
            alt="profile"
          />
          <div className="flex flex-col gap-1 w-60">
            <h4 className="font-medium">{user?.username}</h4>
            <h5 className="text-[#0065E1] cursor-pointer">
              Change profile Photo
            </h5>
          </div>
        </div>

        <div className="sm:w-3/5 mt-10 flex items-center justify-between  w-4/5">
          <label htmlFor="name">Name</label>
          <input
            value={name}
            name="name"
            placeholder="Name"
            onChange={(e) => {
              setName(e.target.value);
            }}
            className=" sm:w-8/12 w-[60%] bg-black text-white px-3 py-2 text-base border rounded-md outline-none"
            type="text"
          />
        </div>
        <div className="sm:w-3/5 flex items-center justify-between  w-4/5 self-center">
          <label htmlFor="username">Username</label>
          <input
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
            }}
            name="username"
            placeholder="Username"
            className=" sm:w-8/12 w-[60%] bg-black text-white px-3 py-2 text-base border rounded-md outline-none"
            type="text"
          />
        </div>
        <div className="sm:w-3/5 flex items-center justify-between  w-4/5 self-center">
          <label htmlFor="bio">Bio</label>
          <textarea
            onChange={(e) => {
              setBio(e.target.value);
            }}
            value={bio}
            name="bio"
            placeholder="Bio"
            className="resize-none h-14 sm:w-8/12 w-[60%] bg-black text-white px-3 py-2 text-base border rounded-md outline-none"
          >
            Bio
          </textarea>
        </div>

        <div className="sm:w-3/5 flex items-center justify-between  w-4/5 self-center">
          <label htmlFor="email">Email</label>
          <input
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            name="email"
            value={email}
            placeholder="Email"
            className=" sm:w-8/12 w-[60%] bg-black text-white px-3 py-2 text-base border rounded-md outline-none"
            type="text"
          />
        </div>

        <div className="sm:w-3/5 flex items-center justify-between  w-4/5 self-center">
          <div className="text-white no-underline text-base">
            Change Password
          </div>
          <button
            className="py-3 px-5 rounded-md bg-[#643FBD] border-none"
            onClick={updateUser}
          >
            Submit
          </button>
        </div>
      </div>
    </XLayout>
  );
};

export default Page;
