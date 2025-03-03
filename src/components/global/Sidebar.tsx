"use client";

import { useThemeStore } from "@/components/providers/ThemeStoreProvider";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import { sidebarItems } from "@/constants/sidebarItems";
import SidebarItem from "@/components/global/SidebarItem";

const Sidebar = () => {
  const { sidebarOpen, closeSidebar } = useThemeStore((state) => state);

  return (
    <div
      className={cn(
        "shadow-md h-full transition-width duration-200",
        sidebarOpen ? "w-[250px]" : "w-[0px]"
      )}
    >
      <div
        className={cn(
          "flex justify-between p-3",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <Image
          className="font-bold rounded-full w-[45px] h-[45px] text-white text-xl flex justify-center items-center cursor-pointer shadow-sm border-2 border-blue-500"
          src="https://ik.imagekit.io/deveoper99/305_plus.png"
          width={45}
          height={45}
          alt="sports-dashboard"
        />
        <FaRegArrowAltCircleLeft
          className="text-4xl p-1 m-2 hover:text-gray-500 transition-colors cursor-pointer"
          onClick={closeSidebar}
        />
      </div>

      <div
        className={cn(
          "mt-3 transition-opacity",
          sidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        )}
      >
        <div className="m-2 p-2 flex flex-col gap-2">
          {sidebarItems.map((item) => (
            <SidebarItem key={item.name} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
