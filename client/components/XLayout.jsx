import React, { useMemo } from "react";
import { BsTwitter } from "react-icons/bs";
import Link from "next/link";
import Image from "next/image";
import { IoIosAddCircleOutline } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { IoSearchOutline } from "react-icons/io5";
import { GoBookmark } from "react-icons/go";
import { RiMoreFill } from "react-icons/ri";
import { useSelector } from "react-redux";
export default function XLayout(props) {
  const { user } = useSelector((state) => state.user);
  const sidebarMenuItems = useMemo(() => [
    {
      title: "Home",
      icon: <GoHome />,
      link: "/",
    },
    {
      title: "Search",
      icon: <IoSearchOutline />,
      link: "/root/search",
    },
    {
      title: "Create",
      icon: <IoIosAddCircleOutline />,
      link: "/root/create",
    },
    {
      title: "Bookmarks",
      icon: <GoBookmark />,
      link: "/root/bookmark",
    },
    {
      title: "Profile",
      icon: (
        <div>
          <img
            className="h-[30px] w-[30px] rounded-full object-cover"
            src={user?.avatar?.url}
            alt="avatar"
          />
        </div>
      ),
      link: `/root/user/${user?._id}`,
    },
  ]);

  return (
    <div className="w-screen h-screen flex flex-col-reverse sm:flex-row bg-gray-900">
      <div className="w-screen z-20 bg-gray-900 sm:relative fixed bottom-0 left-0 sm:w-1/4 sm:h-full sm:flex lg:justify-end sm:justify-center border-t-[1px] border-gray-600 sm:border-none ">
        <div className="flex justify-evenly sm:flex-col sm:w-fit w-full">
          <div className=" px-4 hidden sm:flex">
            <div className="text-2xl h-fit w-fit hover:bg-gray-800 rounded-full p-4 cursor-pointer transition-all hidden sm:flex">
              <BsTwitter />
            </div>
          </div>
          <div className="mt-1 text-xl pr-4 w-full sm:w-fit ">
            <div className=" flex w-full px-3 sm:border-none sm:w-fit sm:flex-col justify-between">
              {sidebarMenuItems.map((item) => (
                <Link
                  key={item.title}
                  className="flex justify-start items-center gap-4 hover:bg-gray-800 rounded-full py-2 px-4 w-fit cursor-pointer mt-2"
                  href={item.link}
                >
                  <span className=" text-3xl">{item.icon}</span>
                  <span className="hidden sm:flex">{item.title}</span>
                </Link>
              ))}
            </div>
          </div>
          <div className=" w-full justify-center hidden sm:flex">
            <div className="sm:flex w-[70%] hidden cursor-pointer items-center gap-3 hover:bg-gray-800 pl-[10px] py-[8px] rounded-full ">
              {user?.avatar?.url && (
                <Image
                  height={35}
                  alt="img"
                  width={35}
                  src={user?.avatar?.url}
                  className=" rounded-full object-cover h-10 w-10"
                />
              )}
              <h1>{user?.name}</h1>
              {/* <RiMoreFill />/ */}
            </div>
          </div>
        </div>
      </div>
      <div className=" w-full sm:w-9/12 h-full">
        <div className=" sm:p-0 overflow-auto no-scrollbar sm:w-3/4 h-[calc(100%-59px)] sm:h-full w-full lg:w-[55%] border-l-[1px] border-r-[1px] border-gray-600">
          {props.children}
        </div>
      </div>
    </div>
  );
}
