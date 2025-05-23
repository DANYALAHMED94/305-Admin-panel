import { FaHome } from "react-icons/fa";
import {
  MdOutlineScreenShare,
  MdLiveTv,
  MdOndemandVideo,
  MdAdsClick,
  MdRecommend,
} from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { GiTeamDowngrade } from "react-icons/gi";
import { RiLiveFill } from "react-icons/ri";
import { IoTimeSharp } from "react-icons/io5";
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
    icon: MdOndemandVideo,
    path: "/videos",
  },
  {
    name: "Live Streams",
    icon: MdLiveTv,
    path: "/live-streams",
  },
  {
    name: "Banner",
    icon: MdOutlineScreenShare,
    path: "/banners",
  },
  {
    name: "Ads",
    icon: MdAdsClick,
    path: "/ads",
  },
  // {
  //   name: "Recommended",
  //   icon: MdRecommend,
  //   path: "/recommended",
  // },
  // {
  //   name: "Live Now",
  //   icon: RiLiveFill,
  //   path: "/live-now",
  // },
  // {
  //   name: "Coming Up",
  //   icon: IoTimeSharp,
  //   path: "/coming-up",
  // },
];
