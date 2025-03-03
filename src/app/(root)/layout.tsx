import Header from "@/components/global/Header";
import Sidebar from "@/components/global/Sidebar";
import React from "react";

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
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
