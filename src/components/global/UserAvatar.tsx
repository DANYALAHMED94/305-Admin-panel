"use client";

import Image from "next/image";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Link from "next/link";
import { HiUserCircle } from "react-icons/hi";
import { FiLogOut } from "react-icons/fi";

interface UserAvatarProps {
  name?: string;
  imgSrc?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({
  name = "John Doe",
  imgSrc,
}) => {
  const colors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-indigo-500",
    "bg-purple-500",
    "bg-pink-500",
  ];
  const randomColorClass = colors[Math.floor(Math.random() * colors.length)];

  const getInitials = (name: string): string => {
    const nameParts = name.split(" ");
    const firstInitial = nameParts[0]?.charAt(0) || "";
    const lastInitial = nameParts[1]?.charAt(0) || "";
    return firstInitial + lastInitial;
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        {imgSrc ? (
          <Image
            src={imgSrc}
            alt={name}
            width={40}
            height={40}
            className="rounded-full w-[40px] h-[40px] m-1 border-2 shadow-sm border-blue-600 cursor-pointer"
          />
        ) : (
          <div
            className={`font-bold rounded-full w-[40px] h-[40px] text-white text-xl ${randomColorClass} flex justify-center items-center m-1 border-2 border-blue-600 cursor-pointer shadow-sm`}
          >
            {getInitials(name)}
          </div>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-32 p-2" side="bottom" data-align="start">
        <div className="flex flex-col">
          <Link
            className="p-1 px-3 flex items-center gap-2 rounded-md hover:bg-gray-50"
            href={"/profile"}
          >
            <HiUserCircle className="text-lg text-gray-600" /> Profile
          </Link>
          <Link
            href={"#"}
            className="p-1 px-3 flex items-center gap-2 rounded-md hover:bg-gray-50"
          >
            <FiLogOut className="text-lg text-gray-600" /> Logout
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default UserAvatar;
