import { useEffect, useState, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";
import { fetchAllMatches } from "../../Api";

const dummyMatches = [
  {
    id: "1",
    category: "Football",
    sub_category: "Premier League",
    league_type: "International",
    match_title: "Man Utd vs Chelsea",
    match_time: "2025-02-20 18:00",
    team_one: "Man Utd",
    team_one_img: "manutd.png",
    team_two: "Chelsea",
    team_two_img: "chelsea.png",
  },
  {
    id: "2",
    category: "Cricket",
    sub_category: "T20 World Cup",
    league_type: "International",
    match_title: "India vs Pakistan",
    match_time: "2025-02-21 20:00",
    team_one: "India",
    team_one_img: "india.png",
    team_two: "Pakistan",
    team_two_img: "pakistan.png",
  },
  {
    id: "3",
    category: "Basketball",
    sub_category: "NBA",
    league_type: "National",
    match_title: "Lakers vs Warriors",
    match_time: "2025-02-22 19:30",
    team_one: "Lakers",
    team_one_img: "lakers.png",
    team_two: "Warriors",
    team_two_img: "warriors.png",
  },
  {
    id: "4",
    category: "Tennis",
    sub_category: "Grand Slam",
    league_type: "International",
    match_title: "Nadal vs Federer",
    match_time: "2025-02-23 15:00",
    team_one: "Nadal",
    team_one_img: "nadal.png",
    team_two: "Federer",
    team_two_img: "federer.png",
  },
  {
    id: "5",
    category: "Hockey",
    sub_category: "NHL",
    league_type: "National",
    match_title: "Blackhawks vs Bruins",
    match_time: "2025-02-24 21:00",
    team_one: "Blackhawks",
    team_one_img: "blackhawks.png",
    team_two: "Bruins",
    team_two_img: "bruins.png",
  },
  {
    id: "6",
    category: "Football",
    sub_category: "La Liga",
    league_type: "International",
    match_title: "Barcelona vs Real Madrid",
    match_time: "2025-02-25 20:00",
    team_one: "Barcelona",
    team_one_img: "barcelona.png",
    team_two: "Real Madrid",
    team_two_img: "realmadrid.png",
  },
  {
    id: "7",
    category: "Cricket",
    sub_category: "IPL",
    league_type: "Domestic",
    match_title: "Mumbai Indians vs Chennai Super Kings",
    match_time: "2025-02-26 19:00",
    team_one: "Mumbai Indians",
    team_one_img: "mumbai.png",
    team_two: "Chennai Super Kings",
    team_two_img: "chennai.png",
  },
  {
    id: "8",
    category: "Basketball",
    sub_category: "EuroLeague",
    league_type: "International",
    match_title: "CSKA Moscow vs Real Madrid",
    match_time: "2025-02-27 18:30",
    team_one: "CSKA Moscow",
    team_one_img: "cskamoscow.png",
    team_two: "Real Madrid",
    team_two_img: "realmadrid.png",
  },
  {
    id: "9",
    category: "Tennis",
    sub_category: "ATP Tour",
    league_type: "International",
    match_title: "Djokovic vs Medvedev",
    match_time: "2025-02-28 16:00",
    team_one: "Djokovic",
    team_one_img: "djokovic.png",
    team_two: "Medvedev",
    team_two_img: "medvedev.png",
  },
  {
    id: "10",
    category: "Hockey",
    sub_category: "KHL",
    league_type: "International",
    match_title: "SKA Saint Petersburg vs Dynamo Moscow",
    match_time: "2025-03-01 22:00",
    team_one: "SKA Saint Petersburg",
    team_one_img: "ska.png",
    team_two: "Dynamo Moscow",
    team_two_img: "dynamo.png",
  },
];

const ManageSubCategory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [matches, setMatches] = useState(dummyMatches);
  const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  const fetchData = useCallback(async () => {
    setLoading(true);
    const currentPage = 1;
    try {
      const response = await fetchAllMatches(currentPage, searchQuery, perPage);
      const { paginatedMatches } = response.data;
      const extractedMatches = paginatedMatches.map((match) => ({
        id: match._id,
        category: match.category,
        sub_category: match.sub_category,
        league_type: match.league_type,
        match_title: match.match_title,
        match_time: match.match_time,
        team_one: match.team_one.name,
        team_one_img: match.team_one.image,
        team_two: match.team_two.name,
        team_two_img: match.team_two.image,
      }));
      setMatches(extractedMatches);
      setFilteredMatches(extractedMatches);
    } catch (error) {
      setMatches(dummyMatches);
      setFilteredMatches(dummyMatches);
    } finally {
      setLoading(false);
    }
  }, [searchQuery, perPage]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = matches.filter(
      (match) =>
        match.category.toLowerCase().includes(lowerCaseQuery) ||
        match.sub_category.toLowerCase().includes(lowerCaseQuery) ||
        match.match_title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredMatches(filtered);
  }, [searchQuery, matches]);

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
        <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
          <Location location={location} />
          {/* <Link to="/admin/sub-category/create-subcategory"> */}
          <Link to="/admin/sub-category/create-sub-category">
            <button className="w-full sm:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
              Create a Sub-Category
            </button>
          </Link>
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
          <input
            type="text"
            className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full sm:w-[300px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[400px]"
            placeholder="Search by category, sub-category, or match title"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <h3 className="text-xl m-3 font-semibold">ALL Sub-Categories</h3>
        {loading ? (
          <div className="mt-3">
            <LoadingBall />
          </div>
        ) : (
          <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Category</th>
                  <th className="border border-gray-300 p-2">Sub-Category</th>
                  <th className="border border-gray-300 p-2">League Type</th>
                  <th className="border border-gray-300 p-2">Match Title</th>
                  <th className="border border-gray-300 p-2">Match Time</th>
                  <th className="border border-gray-300 p-2">Team One</th>
                  <th className="border border-gray-300 p-2">Team Two</th>
                </tr>
              </thead>
              <tbody>
                {filteredMatches.map((match) => (
                  <tr key={match.id} className="text-center">
                    <td className="border border-gray-300 p-2">
                      {match.category}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.sub_category}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.league_type}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.match_title}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.match_time}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.team_one}
                    </td>
                    <td className="border border-gray-300 p-2">
                      {match.team_two}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Portal>
  );
};

export default ManageSubCategory;
