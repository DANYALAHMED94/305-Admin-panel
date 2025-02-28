import LoadingBall from "../global/LoadingBall";
import PropTypes from "prop-types";
import Portal from "./Portal";
import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [time, setTime] = useState({});
  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyCategories = [
          { id: 1, name: "Category A", count: 5 },
          { id: 2, name: "Category B", count: 3 },
          { id: 3, name: "Category C", count: 7 },
        ];
        const dummySubCategories = [
          { id: 1, name: "SubCategory X", count: 4 },
          { id: 2, name: "SubCategory Y", count: 6 },
          { id: 3, name: "SubCategory Z", count: 8 },
        ];
        const dummyTeams = [
          { id: 1, name: "Team Alpha", count: 7 },
          { id: 2, name: "Team Beta", count: 3 },
          { id: 3, name: "Team Gamma", count: 5 },
        ];

        setTime(getTimeInfo());
        setCategories(dummyCategories);
        setSubCategories(dummySubCategories);
        setTeams(dummyTeams);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  function getTimeInfo() {
    const currentDate = new Date();
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedTime = currentDate.toLocaleTimeString(undefined, {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    const formattedDay = currentDate.toLocaleDateString(undefined, {
      weekday: "long",
    });
    const formattedDate = currentDate.toLocaleDateString(undefined, {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
    return {
      timezone: `${timezoneName} UTC ${currentDate.getTimezoneOffset() / 60}`,
      time: formattedTime,
      day: formattedDay,
      date: formattedDate,
    };
  }

  const barChartData = categories;
  const lineChartData = categories.map((cat, index) => ({
    name: cat.name,
    value: cat.count + index,
  }));

  return (
    <Portal>
      <div className="bg-gray-100 p-6 min-h-screen">
        {loading ? (
          <LoadingBall />
        ) : (
          <div className="flex flex-col gap-6">
            {/* Time Info Card */}
            <div className="w-full max-w-md border-l-8 border-blue-600 bg-white rounded-lg shadow-lg p-5">
              <h2 className="text-lg font-semibold">
                Timezone:
                <span className="text-blue-500 text-sm ml-2">
                  {time.timezone}
                </span>
              </h2>
              <h2 className="text-lg font-semibold">
                Time:
                <span className="text-gray-500 text-sm ml-2">{time.time}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Day:
                <span className="text-gray-500 text-sm ml-2">{time.day}</span>
              </h2>
              <h2 className="text-lg font-semibold">
                Date:
                <span className="text-gray-500 text-sm ml-2">{time.date}</span>
              </h2>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex flex-col items-center bg-green-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-4xl font-bold">{categories.length}</h3>
                <p className="mt-2 text-lg font-semibold">Total Categories</p>
              </div>
              <div className="flex flex-col items-center bg-purple-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-4xl font-bold">{subCategories.length}</h3>
                <p className="mt-2 text-lg font-semibold">
                  Total SubCategories
                </p>
              </div>
              <div className="flex flex-col items-center bg-orange-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
                <h3 className="text-4xl font-bold">{teams.length}</h3>
                <p className="mt-2 text-lg font-semibold">Total Teams</p>
              </div>
            </div>

            {/* Category Counts Bar Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Category Counts</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={barChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Category Trends Line Chart */}
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Category Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={lineChartData}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="value" stroke="#FF7300" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </div>
    </Portal>
  );
};

Dashboard.propTypes = {
  list: PropTypes.array,
};

export default Dashboard;
