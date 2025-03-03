import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { IoGrid } from "react-icons/io5";
import { FaList } from "react-icons/fa";
import MatchList from "../ManageBanner/MatchList";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import { handleView, fetchMobileView, fetchAllMatches } from "../../Api";

const ManageLive = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mobileView, setMobileView] = useState(true);
  const [isGrid, setIsGrid] = useState(false);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const currentPage = 1;
    try {
      const view = await fetchMobileView();
      const response = await fetchAllMatches(currentPage, searchQuery, perPage);
      const { paginatedMatches } = response.data;
      const extractedMatches = paginatedMatches.map((match) => ({
        id: match._id,
        status: match.status,
        league_type: match.league_type,
        hot_match: match.hot_match,
        match_title: match.match_title,
        match_time: match.match_time,
        sports_type: match.sport_type,
        team_one: match.team_one.name,
        team_one_img: match.team_one.image,
        team_two: match.team_two.name,
        team_two_img: match.team_two.image,
        stream_count: match.streaming_source.length,
        order: match.order,
      }));
      setMatches(extractedMatches);
      setFilteredMatches(extractedMatches);
      setMobileView(view.data.data);
    } catch (error) {
      console.error("Error fetching matches:", error);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = matches.filter((match) =>
      match.league_type.toLowerCase().startsWith(lowerCaseQuery)
    );
    setFilteredMatches(filtered);
  }, [searchQuery, matches]);

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleGrid = (gridValue) => {
    setIsGrid(gridValue);
  };

  const handleViewState = async () => {
    setMobileView((prevState) => !prevState);
    try {
      const view = { mobile_view: !mobileView };
      const res = await handleView(view);
      if (res) {
        console.log("Mobile view updated successfully");
      }
    } catch (err) {
      console.error("Error updating mobile view:", err);
    }
  };

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
          <Location location={location} />
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex gap-3 items-center">
              <p className="font-semibold text-sm sm:text-base">
                Show on Mobile
              </p>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  checked={mobileView}
                  onChange={handleViewState}
                />
                <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
              </label>
            </div>
            <Link to="/admin/manage-category/create-match">
              <button className="w-full sm:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
                Create a Banner
              </button>
            </Link>
          </div>
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full sm:w-[300px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[400px]"
            placeholder="Search by name or ID"
            value={searchQuery}
            onChange={handleSearchChange}
          />

          <div className="flex gap-2 items-center">
            <div className="p-1 h-max w-max bg-gray-100 rounded-md">
              <IoGrid
                className={`cursor-pointer text-2xl ${
                  isGrid ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleGrid(true)}
              />
            </div>
            <div className="p-1 h-max w-max bg-gray-100 rounded-md">
              <FaList
                className={`cursor-pointer text-2xl ${
                  !isGrid ? "text-blue-500" : "text-gray-500"
                }`}
                onClick={() => handleGrid(false)}
              />
            </div>
            <div className="flex gap-3 items-center">
              <p className="text-sm">Page Size: </p>
              <select
                className="bg-white rounded-md border-2 border-black h-max text-xs text-center pl-2 py-1"
                value={perPage}
                onChange={(e) =>
                  setPerPage(Number.parseInt(e.target.value, 10))
                }
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
                <option value="100">100</option>
                <option value="200">200</option>
              </select>
            </div>
          </div>
        </div>
        <h3 className="text-xl m-3 font-semibold">ALL BANNERS</h3>
        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <MatchList isGrid={isGrid} matchesArray={filteredMatches} />
        )}
      </div>
    </Portal>
  );
};

export default ManageLive;
