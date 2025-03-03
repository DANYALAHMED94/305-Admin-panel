"use client";

import MatchListContainer from "@/components/banners/MatchListContainer";
import Location from "@/components/global/Location";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React, { useState } from "react";
import { FaList } from "react-icons/fa";
import { IoMdGrid } from "react-icons/io";

const page = () => {
  const [mobileView, setMobileView] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [isGrid, setIsGrid] = useState(true);

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
      <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
        <Location />
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="flex gap-3 items-center">
            <p className="font-semibold text-sm sm:text-base">Show on Mobile</p>
            <label className="inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={mobileView}
                onChange={() => setMobileView((prev) => !prev)}
              />
              <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
            </label>
          </div>
          <Link href="/banners/create">
            <button className="w-full sm:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
              Create a Banner
            </button>
          </Link>
        </div>
      </div>
      <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
        <input
          type="text"
          className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full sm:w-[300px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[400px]"
          placeholder="Search by name or ID"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        <div className="flex gap-2 items-center">
          <div className="p-1 h-max w-max bg-gray-100 rounded-md">
            <IoMdGrid
              className={cn(
                "cursor-pointer text-2xl",
                isGrid ? "text-blue-500" : "text-gray-500"
              )}
              onClick={() => setIsGrid(true)}
            />
          </div>
          <div className="p-1 h-max w-max bg-gray-100 rounded-md">
            <FaList
              className={cn(
                "cursor-pointer text-2xl",
                !isGrid ? "text-blue-500" : "text-gray-500"
              )}
              onClick={() => setIsGrid(false)}
            />
          </div>
        </div>
      </div>
      <h3 className="text-xl m-3 font-semibold">ALL BANNERS</h3>
      <MatchListContainer />
    </div>
  );
};

export default page;
