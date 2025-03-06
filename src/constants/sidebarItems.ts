import { FaHome } from "react-icons/fa";
import {
  MdOutlineScreenShare,
  MdCategory,
  MdLiveTv,
  MdScreenSearchDesktop,
  MdOndemandVideo,
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
    name: "Categories",
    icon: TbCategoryFilled,
    path: "/category",
  },

  {
    name: "Teams",
    icon: GiTeamDowngrade,
    path: "/team",
  },
  {
    name: "Videos",
    icon: MdOndemandVideo, // ✅ Changed to Video-specific icon
    path: "/videos",
  },
  {
    name: "Live Streams",
    icon: MdLiveTv,
    path: "/live-streams",
  },
  // {
  //   name: "Sports",
  //   icon: GiSoccerBall, // Alternative: MdSportsSoccer
  //   path: "/sports",
  // },
  {
    name: "Banner",
    icon: MdOutlineScreenShare,
    path: "/banners",
  },
  // {
  //   name: "Matches",
  //   icon: MdScreenSearchDesktop,
  //   path: "/matches",
  // },
];
