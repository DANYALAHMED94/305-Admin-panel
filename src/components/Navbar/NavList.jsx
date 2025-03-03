import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { FaHome } from "react-icons/fa";
import { MdOutlineScreenShare, MdCategory } from "react-icons/md";
import { TbCategoryFilled } from "react-icons/tb";
import { GiTeamDowngrade } from "react-icons/gi";
import { IoIosArrowDown } from "react-icons/io";
import { MdLiveTv } from "react-icons/md";
import { MdScreenSearchDesktop } from "react-icons/md";
import { Transition } from "@headlessui/react"; // Import Transition
import "../styles/navlist.css";

const NavList = () => {
  const location = useLocation();
  const [currIndex, setCurrIndex] = useState(-1);

  const itemList = [
    {
      name: "Home",
      icon: <FaHome />,
      path: "/admin/dashboard",
    },
    {
      name: "Banner",
      icon: <MdOutlineScreenShare />,
      path: "/admin/manage-banner",
    },
    {
      name: "Categories",
      icon: <TbCategoryFilled />,
      subSection: [
        {
          name: "Add Category",
          icon: <MdCategory />,
          path: "/admin/manage-category",
        },
        {
          name: "Add Sub Category",
          icon: <MdCategory />,
          path: "/admin/sub-category",
        },
      ],
    },
    {
      name: "Team",
      icon: <GiTeamDowngrade />,
      path: "/admin/Team",
    },
    {
      name: "Videos",
      icon: <MdLiveTv />,
      path: "/admin/video",
    },
    {
      name: "Matches",
      icon: <MdScreenSearchDesktop />,
      path: "/admin/match",
    },
  ];

  return (
    <div className="m-2 p-2 flex flex-col gap-2">
      {itemList.map((listItem, index) => (
        <SubNavList
          listItem={listItem}
          index={index}
          currIndex={currIndex}
          setIndex={setCurrIndex}
        />
      ))}
    </div>
  );
};

export default NavList;

function SubNavList({ listItem, setIndex, index, currIndex }) {
  const location = useLocation();
  const [hovered, setHovered] = useState(false);

  const opened =
    hovered ||
    index === currIndex ||
    (listItem.subSection &&
      listItem.subSection.some((item) => item.path === location.pathname));

  return (
    <div
    // onMouseEnter={() => setHovered(true)}
    // onMouseLeave={() => setHovered(false)}
    >
      <NavLink
        to={listItem.path}
        className={`flex justify-between items-center gap-3 p-1 h-10 text-gray-600 text-start transition-all hover:bg-gray-200 rounded-md ${
          location.pathname === listItem.path ? "bg-gray-200" : ""
        }`}
        onClick={() => setIndex(index === currIndex ? -1 : index)} // Keep sub-section open until clicked again
      >
        <div className="flex items-center gap-2">
          <div
            className={`text-2xl hover:text-blue-500 ${
              location.pathname === listItem.path ? "text-blue-600" : ""
            }`}
          >
            {listItem.icon}
          </div>
          <p
            className={`text-xs font-semibold ${
              location.pathname === listItem.path
                ? "text-blue-600"
                : "text-gray-800"
            }`}
          >
            {listItem.name}
          </p>
        </div>

        {/* Show arrow icon only if there is a sub-section */}
        {listItem.subSection && (
          <div>
            <IoIosArrowDown
              className={`hover:text-black transition-colors ${
                opened && "rotate-180"
              }`} // Rotate arrow when sub-section is open
            />
          </div>
        )}
      </NavLink>

      {/* Use Headless UI Transition for smooth sub-section showing */}
      {listItem.subSection && (
        <Transition
          show={opened}
          enter="transition-all duration-300 ease-out"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition-all duration-200 ease-in"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="ml-2 p-2">
            {listItem.subSection.map((subItem, subIndex) => (
              <NavLink
                to={subItem.path}
                key={subIndex}
                className={`flex items-center gap-2 p-1 h-10 text-gray-600 text-start transition-all hover:bg-gray-200 rounded-md ${
                  location.pathname === subItem.path ? "bg-gray-200" : ""
                }`}
              >
                <div className="text-xl">{subItem.icon}</div>
                <p
                  className={`text-xs font-semibold ${
                    location.pathname === subItem.path
                      ? "text-blue-600"
                      : "text-gray-800"
                  }`}
                >
                  {subItem.name}
                </p>
              </NavLink>
            ))}
          </div>
        </Transition>
      )}
    </div>
  );
}
