// import { useEffect, useState } from "react";
// import { Link, useLocation } from "react-router-dom";
// import Location from "../global/Location";
// import Portal from "./Portal";
// import LoadingBall from "../global/LoadingBall";

// const dummyVideos = [
//   {
//     id: "1",
//     category: "Education",
//     sub_category: "Science",
//     video_title: "The Wonders of Space",
//     video_time: "2025-02-20 18:00",
//     thumbnail: "space.png",
//   },
//   {
//     id: "2",
//     category: "Entertainment",
//     sub_category: "Movies",
//     video_title: "Top 10 Movies of 2025",
//     video_time: "2025-02-21 20:00",
//     thumbnail: "movies.png",
//   },
//   {
//     id: "3",
//     category: "Music",
//     sub_category: "Pop",
//     video_title: "Best Pop Hits",
//     video_time: "2025-02-22 19:30",
//     thumbnail: "pop.png",
//   },
//   {
//     id: "4",
//     category: "Sports",
//     sub_category: "Football",
//     video_title: "Top Goals of the Season",
//     video_time: "2025-02-23 15:00",
//     thumbnail: "football.png",
//   },
//   {
//     id: "5",
//     category: "Technology",
//     sub_category: "Gadgets",
//     video_title: "Latest Tech Trends",
//     video_time: "2025-02-24 21:00",
//     thumbnail: "tech.png",
//   },
// ];

// const Videos = () => {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [videos, setVideos] = useState(dummyVideos);
//   const [filteredVideos, setFilteredVideos] = useState(dummyVideos);
//   const [loading, setLoading] = useState(false);
//   const location = useLocation();

//   useEffect(() => {
//     const lowerCaseQuery = searchQuery.toLowerCase();
//     const filtered = videos.filter(
//       (video) =>
//         video.category.toLowerCase().includes(lowerCaseQuery) ||
//         video.sub_category.toLowerCase().includes(lowerCaseQuery) ||
//         video.video_title.toLowerCase().includes(lowerCaseQuery)
//     );
//     setFilteredVideos(filtered);
//   }, [searchQuery, videos]);

//   return (
//     <Portal>
//       <div className="flex flex-col min-h-screen bg-gray-100 p-3 md:p-6">
//         <div className="flex flex-col md:flex-row justify-between p-2 gap-4">
//           <Location location={location} />
//           <Link to="/admin/Videos/create-video">
//             <button className="w-full sm:w-auto py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
//               Create a Video
//             </button>
//           </Link>
//         </div>

//         <div className="p-2 flex flex-col sm:flex-row justify-between items-center gap-3">
//           <input
//             type="text"
//             className="p-2 text-sm bg-white rounded-md border-2 border-gray-400 w-full sm:w-[300px] focus:outline-none transition-all duration-300 ease-in-out focus:w-full sm:focus:w-[400px]"
//             placeholder="Search by category, sub-category, or video title"
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//           />
//         </div>

//         <h3 className="text-xl m-3 font-semibold">ALL Videos</h3>
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
//                   <th className="border border-gray-300 p-2">Video Title</th>
//                   <th className="border border-gray-300 p-2">Video Time</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredVideos.map((video) => (
//                   <tr
//                     key={video.id}
//                     className="text-center hover:bg-gray-50 transition-colors"
//                   >
//                     <td className="border border-gray-300 p-2">
//                       {video.category}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {video.sub_category}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {video.video_title}
//                     </td>
//                     <td className="border border-gray-300 p-2">
//                       {video.video_time}
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

// export default Videos;

import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Location from "../global/Location";
import Portal from "./Portal";
import LoadingBall from "../global/LoadingBall";

const dummyVideos = [
  {
    id: "1",
    category: "Education",
    sub_category: "Science",
    video_title: "The Wonders of Space",
    video_time: "2025-02-20 18:00",
    thumbnail: "space.png",
  },
  {
    id: "2",
    category: "Entertainment",
    sub_category: "Movies",
    video_title: "Top 10 Movies of 2025",
    video_time: "2025-02-21 20:00",
    thumbnail: "movies.png",
  },
  {
    id: "3",
    category: "Music",
    sub_category: "Pop",
    video_title: "Best Pop Hits",
    video_time: "2025-02-22 19:30",
    thumbnail: "pop.png",
  },
  {
    id: "4",
    category: "Sports",
    sub_category: "Football",
    video_title: "Top Goals of the Season",
    video_time: "2025-02-23 15:00",
    thumbnail: "football.png",
  },
  {
    id: "5",
    category: "Technology",
    sub_category: "Gadgets",
    video_title: "Latest Tech Trends",
    video_time: "2025-02-24 21:00",
    thumbnail: "tech.png",
  },
];

const Videos = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [videos, setVideos] = useState(dummyVideos);
  const [filteredVideos, setFilteredVideos] = useState(dummyVideos);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = videos.filter(
      (video) =>
        video.category.toLowerCase().includes(lowerCaseQuery) ||
        video.sub_category.toLowerCase().includes(lowerCaseQuery) ||
        video.video_title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredVideos(filtered);
  }, [searchQuery, videos]);

  return (
    <Portal>
      <div className="min-h-screen bg-gray-100 p-3 md:p-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6">
            <Location location={location} />
            <Link to="/admin/video/create-video" className="w-full md:w-auto">
              <button className="w-full py-2 px-4 text-sm uppercase bg-blue-500 text-white rounded-md hover:bg-blue-700 transition active:scale-95 font-semibold">
                Create a Video
              </button>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mb-6">
            <input
              type="text"
              className="w-full sm:w-[300px] p-2 text-sm bg-white rounded-md border-2 border-gray-400 focus:outline-none focus:border-blue-500 transition-all duration-300 ease-in-out"
              placeholder="Search by category, sub-category, or video title"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <h3 className="text-xl font-semibold mb-4">ALL Videos</h3>
          {loading ? (
            <div className="flex justify-center mt-6">
              <LoadingBall />
            </div>
          ) : (
            <div className="overflow-x-auto bg-white rounded-lg shadow-md">
              <table className="min-w-full border-collapse border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="border border-gray-300 p-2">Category</th>
                    <th className="border border-gray-300 p-2">Sub-Category</th>
                    <th className="border border-gray-300 p-2">Video Title</th>
                    <th className="border border-gray-300 p-2">Video Time</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredVideos.map((video) => (
                    <tr
                      key={video.id}
                      className="text-center hover:bg-gray-50 transition-colors"
                    >
                      <td className="border border-gray-300 p-2">
                        {video.category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {video.sub_category}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {video.video_title}
                      </td>
                      <td className="border border-gray-300 p-2">
                        {video.video_time}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </Portal>
  );
};

export default Videos;
