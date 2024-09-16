"use client";
import XLayout from "@/components/XLayout";
import React, { useState } from "react";
import axios from "@/utils/axios";
import { useSelector } from "react-redux";
import Link from "next/link";

const Page = () => {
  const { user } = useSelector((state) => state.user);
  const [userData, setData] = useState([]);
  const [search, setSearch] = useState("");
  const searchUser = async () => {
    const dets = { search };
    const { data } = await axios.post("/user/search", dets);
    setData(data.data);
    if (search.length == 0) {
      setData([]);
    }
  };
  return (
    <XLayout>
      <div className="py-10 flex justify-center flex-col items-center">
        <div className=" flex items-center justify-center w-3/4 sm:w-2/3 mb-10">
          <label htmlFor="simple-search" className="sr-only">
            Search
          </label>
          <div className="w-full">
            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"></div>
            <input
              onChange={(e) => {
                setSearch(e.target.value);
              }}
              value={search}
              type="text"
              id="simple-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search..!"
              required
            />
          </div>
          <button
            className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            onClick={searchUser}
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        {userData?.map((users, i) => {
          return (
            <Link
              key={users._id}
              href={`/root/user/${users?._id}`}
              className="flex items-center w-3/4 sm:w-2/3 justify-between gap-1 mb-2 border-b-[1px] py-2 border-gray-800"
            >
              <div className=" flex items-center gap-1">
                <img
                  className=" h-10 w-10 rounded-full"
                  src={users?.avatar?.url}
                  alt="avatar"
                />
                <h1>{users?.username}</h1>
              </div>
              <div>
                {user?._id !== users?._id && (
                  <div>
                    {user?.following.includes(users?._id) ? (
                      <h1>unFollow</h1>
                    ) : (
                      <h1>Follow</h1>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </XLayout>
  );
};

export default Page;
