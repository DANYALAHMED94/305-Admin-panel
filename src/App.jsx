import { Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/pages/Login.jsx";
import { UserContextProvider } from "./context";
import { CreateMatch, Dashboard, Logout } from "./components/pages/index.js";
import ManageCategory from "./components/pages/ManageCategory.jsx";
import CreateCategory from "./components/ManageBanner/CreateCategory.jsx";
import ManageBanner from "./components/pages/ManageBanner.jsx";
import CreateBanner from "./components/ManageBanner/CreateMatch.jsx";
import ManageSubCategory from "./components/pages/ManageSubCategory.jsx";
import Team from "./components/pages/Team.jsx";
import CreateTeam from "./components/ManageTeam/CreateTeam.jsx";
import CreateSubCategory from "./components/ManageBanner/CreateSubCategory.jsx";
import Videos from "./components/pages/Videos.jsx";
import Matches from "./components/pages/Matches.jsx";
import CreateVideo from "./components/ManageVideo/CreateVideo.jsx";
import CreateNewMatch from "./components/ManageMatch/CreateNewMatch.jsx";

function App() {
  return (
    <>
      <UserContextProvider>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/admin/dashboard" element={<Dashboard />} />

          {/* routes for banner */}
          <Route path="/admin/manage-banner" element={<ManageBanner />} />
          <Route
            path="/admin/manage-banner/create-banner"
            element={<CreateBanner />}
          />

          <Route path="/admin/manage-category" element={<ManageCategory />}>
            {/* Default child route for sub-category */}
            <Route index path="sub-category" element={<ManageSubCategory />} />

            {/* Route for creating a sub-category */}
            <Route path="create-sub-category" element={<CreateSubCategory />} />
          </Route>

          {/* A separate route for /admin/sub-category */}
          <Route path="/admin/sub-category" element={<ManageSubCategory />} />

          {/* Route for creating a category (outside of manage-category) */}
          <Route
            path="/admin/manage-category/create-category"
            element={<CreateCategory />}
          />

          {/* Route for creating a sub-category (outside of manage-category) */}
          <Route
            path="/admin/sub-category/create-sub-category"
            element={<CreateSubCategory />}
          />

          {/* ================================================= */}

          <Route path="/admin/Team" element={<Team />} />
          <Route path="/admin/Team/create-team" element={<CreateTeam />} />

          {/* ================================================= */}

          <Route path="/admin/video" element={<Videos />} />
          <Route path="/admin/video/create-video" element={<CreateVideo />} />

          {/* ================================================= */}

          <Route path="/admin/match" element={<Matches />} />

          <Route
            path="/admin/match/create-match"
            element={<CreateNewMatch />}
          />

          {/* ================================================= */}

          <Route path="/admin/logout" element={<Logout />} />
        </Routes>
      </UserContextProvider>
    </>
  );
}

export default App;
