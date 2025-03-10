"use client";
import { useEffect, useState } from "react";
import LoadingBall from "@/components/global/LoadingBall";
import TimeInfoCard from "@/components/dashboard/TimeInfoCard";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import CategoryLineChart from "@/components/dashboard/CategoryLineChart";
import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "@/services/stats";

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<{
    timezone: string;
    time: string;
    day: string;
    date: string;
  } | null>(null);

  const { data } = useQuery({
    queryKey: ["dashboardStats"],
    queryFn: getDashboardStats,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setTime(getTimeInfo());
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

  return (
    <div className="bg-gray-100 p-6 min-h-screen ">
      {loading ? (
        <LoadingBall />
      ) : (
        <div className="flex flex-col gap-6">
          {time && <TimeInfoCard time={time} />}
          <SummaryCards
            categoriesCount={data?.totalCategories || 0}
            subCategoriesCount={data?.totalSubCategories || 0}
            teamsCount={data?.totalTeams || 0}
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <CategoryBarChart
                data={
                  data?.categories?.map((cat) => ({
                    id: cat._id,
                    name: cat.name,
                    count: cat.count,
                  })) || []
                }
              />
            </div>
            <div>
              <CategoryLineChart
                data={
                  data?.viewsPerCategory?.map((cat) => ({
                    name: cat.name,
                    value: cat.views,
                  })) || []
                }
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
