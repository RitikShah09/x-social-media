"use client";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Layout = ({ children }) => {
  const router = useRouter();
  const { user } = useSelector((state) => state.user);
  useEffect(() => {
    if (!user) router.push("/auth/signin");
  }, [user]);

  return children;
};

export default Layout;
