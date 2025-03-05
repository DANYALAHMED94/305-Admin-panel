import { FaHome } from "react-icons/fa";
import {
  MdOutlineScreenShare,
  MdCategory,
  MdLiveTv,
  MdScreenSearchDesktop,
} from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { GiSoccerBall, GiTeamDowngrade } from "react-icons/gi";
import { SidebarItem } from "@/types/sidebar"; // Import the type

export const sidebarItems: SidebarItem[] = [
  {
    name: "Home",
    icon: FaHome,
    path: "/dashboard",
  },
  {
    name: "Sports",
    icon: GiSoccerBall, // Alternative: MdSportsSoccer
    path: "/sports",
  },
  {
    name: "Banner",
    icon: MdOutlineScreenShare,
    path: "/banners",
  },
  {
    name: "Team",
    icon: GiTeamDowngrade,
    path: "/team",
  },
  {
    name: "Videos",
    icon: MdLiveTv,
    path: "/videos",
  },
  {
    name: "Matches",
    icon: MdScreenSearchDesktop,
    path: "/matches",
  },
  {
    name: "Categories",
    icon: TbCategoryFilled,
    subSection: [
      {
        name: "Add Category",
        icon: MdCategory,
        path: "/category",
      },
      {
        name: "Add Sub Category",
        icon: MdCategory,
        path: "/subcategory",
      },
    ],
  },
];
