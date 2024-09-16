"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "@/utils/axios";
import { BiMessageRounded } from "react-icons/bi";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import XLayout from "@/components/XLayout";
import { useParams, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { asyncCurrentUser } from "@/store/Actions/userActions";
const Page = () => {
  const router = useRouter();
  const [isReply, setIsReply] = useState(false);
  const [cmtId, setCmtId] = useState("");
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { user } = useSelector((state) => state.user);
  const params = useParams();
  const id = params.id;
  const [Post, setPost] = useState("");
  const getData = async () => {
    const { data } = await axios.get(`/post/${id}`);
    setPost(data.post);
  };

  useEffect(() => {
    dispatch(asyncCurrentUser());
    if (!user) router.push("/auth/signin");
    getData();
  }, []);

  const addComment = async () => {
    const data = { postId: id, text: comment };
    await axios.post("/comment", data);
    getData();
    setComment("");
  };

  const replyComment = async () => {
    const data = { commentId: cmtId, text: comment };
    await axios.post("/comment/reply-comment", data);
    getData();
    setCmtId("");
    setComment("");
    setIsReply(false);
  };
  const savePost = async (id) => {
    const { data } = await axios.get(`/post/save-post/${id}`);
    dispatch(asyncCurrentUser());
  };

  const unlikePost = async (id) => {
    const { data } = await axios.get(`/post/unlike/${id}`);
    getData();
  };

  const likePost = async (id) => {
    const { data } = await axios.get(`/post/like/${id}`);
    getData();
  };

  return (
    <XLayout>
      <div className="border border-r-0 border-l-0 border-b-0 border-gray-600 p-5 hover:bg-slate-900 transition-all cursor-pointer">
        <div className=" w-full flex items-center flex-col">
          <div className="flex items-center w-full justify-start gap-3">
            {Post?.userid?.avatar?.url && (
              <Image
                className="rounded-full h-12 w-12 object-cover"
                src={Post?.userid?.avatar?.url}
                alt="user-image"
                height={50}
                width={50}
              />
            )}
            <h5>
              <Link href={`/root/user/${Post?.userid?._id}`}>
                {Post?.userid?.username}
              </Link>
            </h5>
          </div>
          <div className="flex justify-center flex-col">
            <p>{Post?.text}</p>

            {Post.postImage?.url && (
              <Image
                src={Post.postImage?.url}
                alt="image"
                width={450}
                height={400}
              />
            )}

            <div className="flex justify-between mt-5 text-xl items-center p-2 w-full border-b-[1px] border-gray-800">
              <div>
                {Post?.likes?.includes(user?._id) ? (
                  <i
                    className="ri-heart-3-fill text-[#FF3040] cursor-pointer "
                    onClick={() => {
                      unlikePost(Post._id);
                    }}
                  ></i>
                ) : (
                  <i
                    className="ri-heart-3-line cursor-pointer "
                    onClick={() => {
                      likePost(Post._id);
                    }}
                  ></i>
                )}
              </div>
              <div>
                <BiMessageRounded />
              </div>
              <div>
                <CiShare1 />
              </div>
              <div>
                {user?.savedPost.includes(Post._id) ? (
                  <i
                    className="ri-bookmark-fill cursor-pointer"
                    onClick={() => {
                      savePost(Post._id);
                    }}
                  ></i>
                ) : (
                  <i
                    className="ri-bookmark-line cursor-pointer"
                    onClick={() => {
                      savePost(Post._id);
                    }}
                  ></i>
                )}
              </div>
            </div>
            <div className=" flex justify-between bg-gray-800 rounded-lg mt-2">
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                type="text"
                placeholder={isReply ? "add Reply" : "add a comment.."}
                className="bg-gray-800 outline-none px-3 rounded-lg w-4/5"
              />
              <h1
                className=" text-white py-2 px-4 rounded-lg bg-blue-600"
                onClick={isReply ? replyComment : addComment}
              >
                {isReply ? "reply" : "add"}
              </h1>
            </div>
            {Post?.comment?.map((com, i) => {
              return (
                <div key={com._id} className="w-full relative">
                  <div className="flex gap-2 my-2 w-fit border-b-[1px] border-gray-800 py-2">
                    <h1 className=" font-bold">{com?.userid?.name}</h1>
                    <h1>{com?.text}</h1>
                    <h1
                      onClick={() => {
                        setIsReply(true);
                        setCmtId(com._id);
                      }}
                    >
                      reply
                    </h1>
                  </div>
                  {com?.reply?.map((reply, i) => {
                    return (
                      <div
                        key={reply._id}
                        className="flex gap-2 pb-2 justify-end w-full"
                      >
                        <div className="w-1/2 ">
                          <div className=" w-fit border-b-[1px] border-gray-800 flex gap-2">
                            <h1 className=" font-bold">
                              {reply?.userid?.username}
                            </h1>
                            <h1>{reply?.text}</h1>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </XLayout>
  );
};

export default Page;
