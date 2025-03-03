import NavList from "./NavList";
import { FaRegArrowAltCircleLeft } from "react-icons/fa";
import Football from "../../../public/305_plus.png";

const Sidebar = ({ isOpen, onClose }) => {
  return (
    <div
      className={` shadow-md h-[100%] transition-width duration-200 ${
        isOpen ? "w-[250px]" : "w-[0]"
      }`}
    >
      <div
        className={`flex justify-between p-3 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <img
          className="font-bold rounded-full w-[45px] h-[45px] text-white text-xl flex justify-center items-center m-1 cursor-pointer shadow-sm p-[0.125rem] border-2 border-blue-500"
          src={Football}
          alt="sports-dashboard"
        />
        <FaRegArrowAltCircleLeft
          className="text-4xl p-1 m-2 hover:text-gray-500 transition-colors cursor-pointer"
          onClick={onClose}
        />
      </div>
      <div
        className={`mt-3 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        } transition-opacity`}
      >
        <NavList />
      </div>
    </div>
  );
};

export default Sidebar;
