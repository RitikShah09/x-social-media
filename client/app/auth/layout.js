"use client";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { asyncCurrentUser } from "@/store/Actions/userActions";

const Layout = ({ children }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  useEffect(() => {
    dispatch(asyncCurrentUser());
  }, []);
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    if (user) router.push("/");
  }, [user]);

  return children;
};

export default Layout;
