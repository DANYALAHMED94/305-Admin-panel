// import { useEffect, useState, useCallback } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Location from "../global/Location";
// import Portal from "./Portal";
// import LoadingBall from "../global/LoadingBall";
// import { fetchAllMatches } from "../../Api";

// const dummyMatches = [
//   {
//     id: "1",
//     category: "Football",
//     sub_category: "Premier League",
//     league_type: "International",
//     match_title: "Man Utd vs Chelsea",
//     match_time: "2025-02-20 18:00",
//     team_one: "Man Utd",
//     team_one_img: "manutd.png",
//     team_two: "Chelsea",
//     team_two_img: "chelsea.png",
//   },
//   {
//     id: "2",
//     category: "Cricket",
//     sub_category: "T20 World Cup",
//     league_type: "International",
//     match_title: "India vs Pakistan",
//     match_time: "2025-02-21 20:00",
//     team_one: "India",
//     team_one_img: "india.png",
//     team_two: "Pakistan",
//     team_two_img: "pakistan.png",
//   },
//   {
//     id: "3",
//     category: "Basketball",
//     sub_category: "NBA",
//     league_type: "National",
//     match_title: "Lakers vs Warriors",
//     match_time: "2025-02-22 19:30",
//     team_one: "Lakers",
//     team_one_img: "lakers.png",
//     team_two: "Warriors",
//     team_two_img: "warriors.png",
//   },
//   {
//     id: "4",
//     category: "Tennis",
//     sub_category: "Grand Slam",
//     league_type: "International",
//     match_title: "Nadal vs Federer",
//     match_time: "2025-02-23 15:00",
//     team_one: "Nadal",
//     team_one_img: "nadal.png",
//     team_two: "Federer",
//     team_two_img: "federer.png",
//   },
//   {
//     id: "5",
//     category: "Hockey",
//     sub_category: "NHL",
//     league_type: "National",
//     match_title: "Blackhawks vs Bruins",
//     match_time: "2025-02-24 21:00",
//     team_one: "Blackhawks",
//     team_one_img: "blackhawks.png",
//     team_two: "Bruins",
//     team_two_img: "bruins.png",
//   },
// ];

// const Team = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [perPage, setPerPage] = useState(10);
//   const [matches, setMatches] = useState(dummyMatches);
//   const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   const fetchData = useCallback(async () => {
//     setLoading(true);
//     const currentPage = 1;
//     try {
//       const response = await fetchAllMatches(currentPage, searchQuery, perPage);
//       const { paginatedMatches } = response.data;
//       const extractedMatches = paginatedMatches.map((match) => ({
//         id: match._id,
//         category: match.category,
//         sub_category: match.sub_category,
//         league_type: match.league_type,
//         match_title: match.match_title,
//         match_time: match.match_time,
//         team_one: match.team_one.name,
//         team_one_img: match.team_one.image,
//         team_two: match.team_two.name,
//         team_two_img: match.team_two.image,
//       }));
//       setMatches(extractedMatches);
//       setFilteredMatches(extractedMatches);
//     } catch (error) {
//       console.error("Error fetching matches, displaying dummy data:", error);
//       setMatches(dummyMatches);
//       setFilteredMatches(dummyMatches);
//     } finally {
//       setLoading(false);
//     }
//   }, [searchQuery, perPage]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   useEffect(() => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const filtered = matches.filter(
//       (match) =>
//         match.category.toLowerCase().includes(lowerCaseQuery) ||
//         match.sub_category.toLowerCase().includes(lowerCaseQuery) ||
//         match.match_title.toLowerCase().includes(lowerCaseQuery)
//     );
//     setFilteredMatches(filtered);
//   }, [searchQuery, matches]);

//   return (
//     <Portal>
//       <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
//         <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
//           <Location location={location} />
//           <Link to="/admin/Team/create-team">
//             <button className="w-full sm:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
//               Create a Team
//             </button>
//           </Link>
//         </div>

//         <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
//           <input
//             type="text"
//             className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full sm:w-[300px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[400px]"
//             placeholder="Search by category, sub-category, or match title"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <h3 className="text-xl m-3 font-semibold">ALL Team</h3>
//         {loading ? (
//           <div className="mt-3">
//             <LoadingBall />
//           </div>
//         ) : (
//           <div className="overflow-x-auto bg-white p-4 rounded-lg shadow-md">
//             <table className="w-full border-collapse border border-gray-300">
//               <thead>
//                 <tr className="bg-gray-200">
//                   <th className="border border-gray-300 p-2">Category</th>
//                   <th className="border border-gray-300 p-2">Sub-Category</th>
//                   <th className="border border-gray-300 p-2">League Type</th>
//                   <th className="border border-gray-300 p-2">Match Title</th>
//                   <th className="border border-gray-300 p-2">Match Time</th>
//                   <th className="border border-gray-300 p-2">Team One</th>
//                   <th className="border border-gray-300 p-2">Team Two</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredMatches.map((match) => (
//                   <tr
//                     key={match.id}
//                     className="text-center hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="border border-gray-300 p-2">
//                       {match.category}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.sub_category}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.league_type}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.match_title}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.match_time}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.team_one}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {match.team_two}
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>
//     </Portal>
//   );
// };

// export default Team;

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
];

const Team = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [perPage, setPerPage] = useState(10);
  const [matches, setMatches] = useState(dummyMatches);
  const [filteredMatches, setFilteredMatches] = useState(dummyMatches);
  const [loading, setLoading] = useState(false);
  const [isCardView, setIsCardView] = useState(false);
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
      console.error("Error fetching matches, displaying dummy data:", error);
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

  // Check if screen is mobile on component mount and window resize
  useEffect(() => {
    const handleResize = () => {
      setIsCardView(window.innerWidth < 768);
    };

    // Set initial value
    handleResize();

    // Add event listener
    window.addEventListener("resize", handleResize);

    // Clean up
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Format match time to be more readable
  const formatMatchTime = (timeString) => {
    const date = new Date(timeString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Portal>
      <div className="flex flex-col min-h-screen bg-gray-100 p-2 md:p-6">
        <div className="flex flex-col md:flex-row justify-between items-center p-2 gap-3 mb-4">
          <Location location={location} />
          <Link to="/admin/Team/create-team">
            <button className="w-full md:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
              Create a Team
            </button>
          </Link>
        </div>

        <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3 mb-4">
          <div className="w-full sm:w-auto">
            <input
              type="text"
              className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full focus:outline-none focus:border-blue-500"
              placeholder="Search category, match title..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <select
              className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500"
              value={perPage}
              onChange={(e) => setPerPage(Number(e.target.value))}
            >
              <option value={5}>5 per page</option>
              <option value={10}>10 per page</option>
              <option value={20}>20 per page</option>
              <option value={50}>50 per page</option>
            </select>

            <div className="flex ml-auto sm:ml-2">
              <button
                onClick={() => setIsCardView(false)}
                className={`p-2 rounded-l-md ${
                  !isCardView ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <button
                onClick={() => setIsCardView(true)}
                className={`p-2 rounded-r-md ${
                  isCardView ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6a2 2 0 012-2h14a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V6z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <h3 className="text-xl mx-2 mb-4 font-semibold">All Teams</h3>

        {loading ? (
          <div className="flex justify-center items-center my-8">
            <LoadingBall />
          </div>
        ) : (
          <>
            {/* Table View for larger screens */}
            {!isCardView && (
              <div className="overflow-x-auto bg-white p-2 md:p-4 rounded-lg shadow-md">
                <table className="w-full border-collapse border border-gray-300 text-sm md:text-base">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 p-1 md:p-2">
                        Category
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2 hidden sm:table-cell">
                        Sub-Category
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2 hidden md:table-cell">
                        League Type
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Match
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2 hidden sm:table-cell">
                        Time
                      </th>
                      <th className="border border-gray-300 p-1 md:p-2">
                        Teams
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMatches.map((match) => (
                      <tr
                        key={match.id}
                        className="text-center hover:bg-gray-50 transition-colors"
                      >
                        <td className="border border-gray-300 p-1 md:p-2 font-medium">
                          {match.category}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2 hidden sm:table-cell">
                          {match.sub_category}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2 hidden md:table-cell">
                          {match.league_type}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          {match.match_title}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2 whitespace-nowrap hidden sm:table-cell">
                          {formatMatchTime(match.match_time)}
                        </td>
                        <td className="border border-gray-300 p-1 md:p-2">
                          <div className="flex flex-col md:flex-row justify-center gap-1 md:gap-2 items-center">
                            <span>{match.team_one}</span>
                            <span className="hidden md:inline">vs</span>
                            <span>{match.team_two}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* Card View for mobile screens */}
            {isCardView && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredMatches.map((match) => (
                  <div
                    key={match.id}
                    className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-semibold">
                        {match.category}
                      </span>
                      <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs">
                        {match.sub_category}
                      </span>
                    </div>

                    <h3 className="font-bold text-lg mb-2 text-center">
                      {match.match_title}
                    </h3>

                    <div className="flex justify-between items-center mb-3">
                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-1">
                          {/* Replace with actual image if available */}
                          <span className="font-bold">
                            {match.team_one.charAt(0)}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{match.team_one}</p>
                      </div>

                      <div className="text-center">
                        <span className="font-bold text-xl">VS</span>
                      </div>

                      <div className="text-center">
                        <div className="w-12 h-12 mx-auto bg-gray-200 rounded-full flex items-center justify-center mb-1">
                          {/* Replace with actual image if available */}
                          <span className="font-bold">
                            {match.team_two.charAt(0)}
                          </span>
                        </div>
                        <p className="text-sm font-medium">{match.team_two}</p>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm border-t pt-2">
                      <div>
                        <p className="text-gray-500">
                          League:{" "}
                          <span className="text-gray-700">
                            {match.league_type}
                          </span>
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-500 font-medium">
                          {formatMatchTime(match.match_time)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {filteredMatches.length === 0 && (
              <div className="text-center py-8 bg-white rounded-lg shadow-md">
                <p className="text-gray-500">
                  No teams found matching your search criteria.
                </p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="mt-4 py-2 px-4 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-700 transition"
                >
                  Clear Search
                </button>
              </div>
            )}

            {/* Add basic pagination controls */}
            {filteredMatches.length > 0 && (
              <div className="flex justify-between items-center mt-4 p-2">
                <div className="text-sm text-gray-600">
                  Showing {filteredMatches.length} of {matches.length} teams
                </div>
                <div className="flex gap-2">
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    disabled
                  >
                    Previous
                  </button>
                  <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600">
                    1
                  </button>
                  <button
                    className="px-3 py-1 bg-gray-200 rounded-md hover:bg-gray-300 disabled:opacity-50"
                    disabled
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </Portal>
  );
};

export default Team;
