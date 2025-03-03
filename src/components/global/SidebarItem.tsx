"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { Transition } from "@headlessui/react";
import { IconType } from "react-icons";

interface SidebarItemProps {
  name: string;
  icon: IconType;
  path?: string;
  subSection?: SidebarItemProps[];
}

const SidebarItem: React.FC<{ item: SidebarItemProps }> = ({ item }) => {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Main Sidebar Item */}
      <Link
        href={item.path || "#"}
        className={`flex justify-between items-center gap-3 p-2 h-12 text-gray-600 text-start transition-all hover:bg-gray-200 rounded-md ${
          pathname === item.path ? "bg-gray-200" : ""
        }`}
        onClick={(e) => {
          if (item.subSection) {
            e.preventDefault();
            setIsOpen((prev) => !prev);
          }
        }}
      >
        <div className="flex items-center gap-2">
          <item.icon
            className={`text-2xl ${
              pathname === item.path ? "text-blue-600" : "hover:text-blue-500"
            }`}
          />
          <span
            className={`text-sm font-semibold ${
              pathname === item.path ? "text-blue-600" : "text-gray-800"
            }`}
          >
            {item.name}
          </span>
        </div>

        {/* Sub-section arrow */}
        {item.subSection && (
          <IoIosArrowDown
            className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
          />
        )}
      </Link>

      {/* Sub-Section */}
      {item.subSection && (
        <Transition
          show={isOpen}
          enter="transition-all duration-300 ease-out"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition-all duration-200 ease-in"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="ml-4 space-y-1">
            {item.subSection.map((subItem) => (
              <Link
                key={subItem.name}
                href={subItem.path || "#"}
                className={`flex items-center gap-2 p-2 text-gray-600 text-sm transition-all hover:bg-gray-200 rounded-md ${
                  pathname === subItem.path ? "bg-gray-200 text-blue-600" : ""
                }`}
              >
                <subItem.icon className="text-xl" />
                {subItem.name}
              </Link>
            ))}
          </div>
        </Transition>
      )}
    </div>
  );
};

export default SidebarItem;
