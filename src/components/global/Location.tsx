"use client";

import { FaHome } from "react-icons/fa";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

const Location = () => {
  const pathname = usePathname();

  const getBreadcrumbs = (path: string) => {
    const parts = path.split("/").filter(Boolean);

    return parts.map((part, index) => {
      const formattedName = part
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      const route = "/" + parts.slice(0, index + 1).join("/");

      return { name: formattedName, route };
    });
  };

  const breadcrumbs = getBreadcrumbs(pathname);

  return (
    <div className="p-3 flex text-sm font-semibold items-center gap-2">
      <Link href="/dashboard">
        <FaHome className="h-5 w-5 text-blue-600 cursor-pointer transition hover:text-gray-600" />
      </Link>

      {breadcrumbs
        .filter((crumb) => crumb.name.toLowerCase() !== "admin")
        .map((crumb, index, arr) => (
          <span key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 text-gray-500 mx-1" />
            <Link
              href={crumb.route}
              className={cn(
                "cursor-pointer transition hover:text-gray-600 mx-2",
                index === arr.length - 1
                  ? "text-blue-600"
                  : "text-gray-800 underline"
              )}
            >
              {crumb.name}
            </Link>
          </span>
        ))}
    </div>
  );
};

export default Location;
