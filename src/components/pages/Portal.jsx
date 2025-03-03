import Sidebar from "../Navbar/Sidebar.jsx";
import { GiHamburgerMenu } from "react-icons/gi";
import User from "../Navbar/User.jsx";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import PropTypes from "prop-types";

const Portal = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [open, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigation = useNavigate();
  const location = useLocation();

  const handleOpen = () => {
    setOpen((prevState) => !prevState);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  useEffect(() => {
    const getUser = () => {
      const value = JSON.parse(localStorage.getItem("user"));
      if (value) {
        setUser(value);
      } else {
        navigation("/admin/dashboard");
      }
    };

    getUser();
  }, [navigation, location.pathname]);

  if (user === null) {
    return null;
  }

  return (
    <div className="flex w-full">
      {user ? (
        <>
          <div>
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />
          </div>
          <div className="h-max w-full shadow-sm">
            <div className="bg-gray-300 p-2">
              <div className="flex justify-between items-center">
                <div className="flex gap-2 justify-center items-center">
                  {!isSidebarOpen && (
                    <GiHamburgerMenu
                      className="text-3xl border-2 border-black rounded-full p-1 hover:text-gray-600 hover:border-gray-600 transition-colors cursor-pointer"
                      onClick={toggleSidebar}
                    />
                  )}
                  <div className="font-bold text-md">
                    <p className="p-2 m-2 border-2 border-black rounded-md">
                      Welcome Back:{" "}
                      <span className="text-blue-600">{user.name}</span>
                    </p>
                  </div>
                </div>
                <div className="relative" onClick={handleOpen}>
                  <User name={"john doe"} imgSrc={user.img} />
                  {open && (
                    <Link
                      className="absolute right-0 p-2 bg-white rounded-md z-10 min-w-[100px] flex gap-2 items-center justify-center font-sm transition hover:text-red-600"
                      to="/admin/logout"
                    >
                      <CiLogout className="text-xl" />
                      <p>Logout</p>
                    </Link>
                  )}
                </div>
              </div>
            </div>
            <div>{children}</div>
          </div>
        </>
      ) : null}
    </div>
  );
};

Portal.propTypes = {
  children: PropTypes.node,
};

export default Portal;
