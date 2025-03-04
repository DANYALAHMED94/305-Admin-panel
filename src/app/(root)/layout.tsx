"use client";

import Header from "@/components/global/Header";
import Sidebar from "@/components/global/Sidebar";
import React, { useEffect } from "react";
import { useAuthStore } from "@/components/providers/AuthStoreProvider";
import { useRouter } from "next/navigation";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const { user } = useAuthStore((state) => state);
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  }, [user, router]);

  if (!user) {
    return null;
  }

  return (
    <div className="flex w-full h-screen overflow-y-auto">
      <div className="h-screen">
        <Sidebar />
      </div>
      <div className=" w-full shadow-sm h-screen overflow-y-scroll">
        <Header />
        <div className=" max-h-full h-full">{children}</div>
      </div>
    </div>
  );
};

export default RootLayout;
