import { Routes, Route } from "react-router-dom";
import Login from "./components/pages/Login.jsx";
import Dashboard from "./components/pages/Dashboard.jsx";

import ManageLive from "./components/pages/ManageLive.jsx";
import News from "./components/pages/News.jsx";

import CreateMatch from "./components/pages/CreateMatch.jsx";

import Logout from "./components/pages/Logout.jsx";

import CreateNotification from "./components/Notifications/CreateNotification.jsx";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/manage-live" element={<ManageLive />} />

      <Route path="/news" element={<News />} />
      <Route path="/manage-live/create-match" element={<CreateMatch />} />

      <Route
        path="/notification/create-notification"
        element={<CreateNotification />}
      />
      <Route path="/logout" element={<Logout />} />
    </Routes>
  );
};

export default AdminRoutes;
