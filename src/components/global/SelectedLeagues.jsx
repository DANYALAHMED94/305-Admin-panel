// import { TiArrowUnsorted } from "react-icons/ti";
// import { MdDelete } from "react-icons/md";
// import { useEffect, useState } from "react";
// import { Reorder } from "framer-motion";
// import LoadingBall from "./LoadingBall.jsx";
// import { deleteLeague } from "../../Api.js";

// const SelectedLeagues = ({ leagues: initialLeague }) => {
//   const [items, setItems] = useState(initialLeague);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);
//     if (initialLeague && initialLeague.length > 0) {
//       setItems(initialLeague);
//       setLoading(false);
//     } else {
//       setLoading(false);
//     }
//   }, [initialLeague]);

//   const handleDelete = async (id, index) => {
//     setLoading(true);
//     try {
//       const res = await deleteLeague(id);
//       console.log(res);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//       setItems((prevItems) => prevItems.filter((item, i) => i !== index));
//     }
//   };

//   return (
//     <main className="mt-5">
//       {loading ? (
//         <LoadingBall />
//       ) : (
//         <>
//           {items.length > 0 ? (
//             <Reorder.Group values={items} onReorder={setItems}>
//               {items.map((item, index) => (
//                 <Reorder.Item value={item} key={item.code}>
//                   <div
//                     key={item.code}
//                     className="mb-3 w-full bg-white rounded-md shadow-md p-4 flex justify-between items-center"
//                   >
//                     <div className="flex gap-3 items-center">
//                       <TiArrowUnsorted className="text-gray-500 text-xl cursor-pointer hover:text-gray-700 transition-colors" />
//                       <img
//                         src={item.logo}
//                         alt={item.name}
//                         className="rounded-md h-[40px] w-[40px]"
//                       />
//                       <h3 className="text-sm font-semibold">{item.name}</h3>
//                     </div>
//                     <MdDelete
//                       className="text-red-600 text-xl hover:text-red-900 transition-colors cursor-pointer"
//                       onClick={() => handleDelete(item._id, index)}
//                     />
//                   </div>
//                 </Reorder.Item>
//               ))}
//             </Reorder.Group>
//           ) : (
//             <p className="font-semibold">No data found...</p>
//           )}
//         </>
//       )}
//     </main>
//   );
// };

// export default SelectedLeagues;

import { useEffect, useState } from "react";
import { Reorder } from "framer-motion";
import { TiArrowUnsorted } from "react-icons/ti";
// import { MdDelete } from "react-icons/md";
import { getLeagues } from "../../Api.js";

const LeaguesList = ({ propsPass }) => {
  const [items, setItems] = useState([]);

  // Fetch data from the API when the component mounts
  useEffect(() => {
    if (!propsPass) return;
    // const fetchLeagues = async () => {
    //   try {
    //     const response = await getLeagues();
    //     const leaguesData = response; // Access the leagues data array

    //     setItems(leaguesData); // Set the state with the formatted data
    //   } catch (error) {
    //     console.error("Error fetching leagues:", error);
    //   }
    // };

    // fetchLeagues();
    setItems(propsPass);
  }, [propsPass]);

  return (
    <>
      {items?.length > 0 ? (
        <Reorder.Group values={items} onReorder={setItems}>
          {items.map((item, index) => (
            <Reorder.Item value={item} key={item?.id}>
              <div className="mb-3 w-full bg-white rounded-md shadow-md p-4 flex justify-between items-center">
                <div className="flex gap-3 items-center">
                  <TiArrowUnsorted className="text-gray-500 text-xl cursor-pointer hover:text-green-500 transition-colors" />
                  <img
                    src={item.image_path} // Use logo from API response
                    alt={item.id} // Use name from API response
                    className=" h-[40px] w-[40px] rounded-full border-2 border-[#cccfd5] "
                  />
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                </div>
              </div>
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : (
        ""
      )}
    </>
  );
};

export default LeaguesList;
