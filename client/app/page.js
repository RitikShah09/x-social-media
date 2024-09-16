"use client";
import FeedCard from "@/components/FeedCard";
import XLayout from "@/components/XLayout";
import React from "react";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { asyncAddPost } from "@/store/Actions/postActions";

const Page = () => {
  const { user } = useSelector((state) => state.user);
  const router = useRouter();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) router.push("/auth/signin");
  }, [user]);

  useEffect(() => {
    dispatch(asyncAddPost());
  }, []);
  return (
    <XLayout>
      <FeedCard />
    </XLayout>
  );
};

export default Page;
