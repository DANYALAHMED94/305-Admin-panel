import { createContext, useContext, useState } from "react";
import { loginUser } from "../Api";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const navigation = useNavigate();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (values) => {
    try {
      const res = await loginUser(values);
      if (res?.data?.success) {
        localStorage.setItem("user", JSON.stringify(res?.data));
        setUser({ isAuth: true, ...res?.data });

        if (res?.data?.role === "admin") {
          navigation("/admin/dashboard");
        }
        return true;
      }
    } catch (error) {
      console.log(error?.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setIsAuthenticated(false);
    navigation("/");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
