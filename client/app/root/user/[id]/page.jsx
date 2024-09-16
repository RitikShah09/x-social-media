"use client";
import Image from "next/image";
import { BsArrowLeftShort } from "react-icons/bs";
import XLayout from "@/components/XLayout";
import { useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import axios from "@/utils/axios";
import { useEffect, useState } from "react";
import Link from "next/link";
import React from "react";
import { CiShare1 } from "react-icons/ci";
import { useDispatch } from "react-redux";
import "remixicon/fonts/remixicon.css";

import {
  asyncCurrentUser,
  asyncFollowUser,
  asyncUnFollowUser,
} from "@/store/Actions/userActions";
const UserProfilePage = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.id;
  const { user } = useSelector((state) => state.user);
  const [userById, setUser] = useState("");
  const [postByUser, setPosts] = useState([]);
  const dispatch = useDispatch();

  const getData = async () => {
    const { data } = await axios.get(`/user/${id}`);
    setUser(data.user);
    setPosts(data.posts);
  };

  useEffect(() => {
    getData();
  }, []);

   const savePost = async (id) => {
     const { data } = await axios.get(`/post/save-post/${id}`);
     dispatch(asyncCurrentUser());
     getData();
   };

   const unlikePost = async (id) => {
     const { data } = await axios.get(`/post/unlike/${id}`);
     getData();
   };

   const likePost = async (id) => {
     const { data } = await axios.get(`/post/like/${id}`);
     getData();
   };

  const followUser = async () => {
    const data = { id: id };
    await dispatch(asyncFollowUser(data));
    getData();
  };

  const unFollowUser = async () => {
    const data = { id: id };
    await dispatch(asyncUnFollowUser(data));
    getData();
  };

  return (
    <div>
      <XLayout>
        <div>
          <nav className="flex items-center gap-3 py-3 px-3">
            <BsArrowLeftShort
              className="text-4xl cursor-pointer"
              onClick={() => {
                router.back();
              }}
            />
            <div>
              <h1 className="text-2xl font-bold">{userById?.username}</h1>
              <h1 className="text-md font-bold text-slate-500">
                {userById?.posts?.length} Tweets
              </h1>
            </div>
          </nav>
          <div className="p-4 border-b border-slate-800">
            {userById?.avatar?.url && (
              <Image
                src={userById?.avatar?.url}
                alt="user-image"
                className="rounded-full h-20 w-20 object-cover"
                width={100}
                height={100}
              />
            )}

            <h1 className="text-2xl font-bold mt-5">{userById?.name}</h1>
            <div className="flex justify-between items-center">
              <div className="flex gap-4 mt-2 text-sm text-gray-400">
                <span>{userById?.followers?.length} followers</span>
                <span>{userById?.following?.length} following</span>
              </div>

              {user?._id == id ? (
                <Link
                  href={"/root/edit"}
                  className="bg-white text-black px-5 py-1 rounded-full text-lg"
                >
                  Edit
                </Link>
              ) : (
                <div>
                  {user?.following.includes(id) ? (
                    <button
                      className="bg-white text-black px-5 py-1 rounded-full text-lg"
                      onClick={unFollowUser}
                    >
                      Unfollow
                    </button>
                  ) : (
                    <button
                      className="bg-white text-black px-5 py-1 rounded-full text-lg"
                      onClick={followUser}
                    >
                      Follow
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
        <div>
          {postByUser?.map((post, i) => {
            return (
              <div
                key={post._id}
                className=" hover:bg-slate-800 transition-all cursor-pointer border-b-[1px] border-gray-700 "
              >
                <div className=" w-full flex items-center flex-col p-5">
                  <div className="flex items-center w-full justify-start gap-3 mb-2">
                    {userById?.avatar?.url && (
                      <Image
                        className="rounded-full h-10 w-10 object-cover"
                        src={userById?.avatar?.url}
                        alt="user-image"
                        height={50}
                        width={50}
                      />
                    )}

                    <Link href={`/root/user/${post?.userid}`}>
                      <h1>{userById?.username}</h1>
                    </Link>
                  </div>
                  <div className="flex justify-center flex-col">
                    <h1>{post?.text}</h1>
                    <Link key={post._id} href={`/root/post/${post._id}`}>
                      {post?.postImage?.url && (
                        <Image
                          src={post?.postImage?.url}
                          alt="image"
                          width={450}
                          height={400}
                        />
                      )}
                    </Link>
                    <div
                      className="flex justify-between mt-5 text-xl items-center p-2 w-full"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    >
                      {post.likes.includes(user?._id) ? (
                        <i
                          className="ri-heart-3-fill text-[#FF3040] cursor-pointer "
                          onClick={() => {
                            unlikePost(post._id);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="ri-heart-3-line cursor-pointer "
                          onClick={() => {
                            likePost(post._id);
                          }}
                        ></i>
                      )}
                      <Link href={`/root/post/${post._id}`}>
                        <i className="ri-chat-3-line cursor-pointer "></i>
                      </Link>
                      <div>
                        <CiShare1 />
                      </div>
                      {user?.savedPost.includes(post._id) ? (
                        <i
                          className="ri-bookmark-fill cursor-pointer"
                          onClick={() => {
                            savePost(post._id);
                          }}
                        ></i>
                      ) : (
                        <i
                          className="ri-bookmark-line cursor-pointer"
                          onClick={() => {
                            savePost(post._id);
                          }}
                        ></i>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </XLayout>
    </div>
  );
};

export default UserProfilePage;
