import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CiShare1 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import "remixicon/fonts/remixicon.css";
import {
  asyncLikePost,
  asyncSavePost,
  asyncUnLikePost,
} from "@/store/Actions/postActions";
const FeedCard = () => {
  const dispatch = useDispatch();
  const Post = useSelector((state) => state.post.allPost);
  const { user } = useSelector((state) => state.user);
  const likePost = (id) => {
    dispatch(asyncLikePost(id));
  };

  const unlikePost = (id) => {
    dispatch(asyncUnLikePost(id));
  };

  const savePost = (id) => {
    dispatch(asyncSavePost(id));
  };
  return (
    <div>
      {Post?.allPosts?.map((post, i) => {
        return (
          <div key={post._id} className=" hover:bg-slate-800 transition-all cursor-pointer border-b-[1px] border-gray-700 ">
            <div className=" w-full flex items-center flex-col p-5">
              <div className="flex items-center w-full justify-start gap-3 mb-2">
                {post?.userid?.avatar?.url && (
                  <Image
                    className="rounded-full h-10 w-10 object-cover"
                    src={post?.userid?.avatar?.url}
                    alt="user-image"
                    height={50}
                    width={50}
                  />
                )}

                <Link href={`/root/user/${post?.userid?._id}`}>
                  <h1>{post?.userid?.username}</h1>
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
  );
};

export default FeedCard;
