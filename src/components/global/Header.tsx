"use client";
import React from "react";
import { useThemeStore } from "@/components/providers/ThemeStoreProvider";
import { GiHamburgerMenu } from "react-icons/gi";
import UserAvatar from "./UserAvatar";

const Header = () => {
  const { sidebarOpen, toggleSidebar } = useThemeStore((state) => state);

  return (
    <div className="bg-white p-2 shadow sticky z-[50] top-0">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 justify-center items-center">
          {!sidebarOpen && (
            <GiHamburgerMenu
              className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
              onClick={toggleSidebar}
            />
          )}
          <div className="font-bold text-md">
            <p className="p-2 m-2 text-gray-800 font-medium border-2 border-gray-400 shadow rounded-md">
              Welcome Back: <span className="text-blue-600">Admin</span>
            </p>
          </div>
        </div>
        <div className="relative">
          <UserAvatar
            name={"john doe"}
            imgSrc={
              "https://ik.imagekit.io/deveoper99/blue-circle-with-white-user_78370-4707.avif"
            }
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
