"use client";
import { useEffect, useState } from "react";
import LoadingBall from "@/components/global/LoadingBall";
import TimeInfoCard from "@/components/dashboard/TimeInfoCard";
import SummaryCards from "@/components/dashboard/SummaryCards";
import CategoryBarChart from "@/components/dashboard/CategoryBarChart";
import CategoryLineChart from "@/components/dashboard/CategoryLineChart";

interface Category {
  id: number;
  name: string;
  count: number;
}

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [time, setTime] = useState<{
    timezone: string;
    time: string;
    day: string;
    date: string;
  } | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [subCategories, setSubCategories] = useState<Category[]>([]);
  const [teams, setTeams] = useState<Category[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const dummyCategories: Category[] = [
          { id: 1, name: "Category A", count: 5 },
          { id: 2, name: "Category B", count: 3 },
          { id: 3, name: "Category C", count: 7 },
        ];
        const dummySubCategories: Category[] = [
          { id: 1, name: "SubCategory X", count: 4 },
          { id: 2, name: "SubCategory Y", count: 6 },
          { id: 3, name: "SubCategory Z", count: 8 },
        ];
        const dummyTeams: Category[] = [
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

  return (
    <div className="bg-gray-100 p-6 min-h-screen ">
      {loading ? (
        <LoadingBall />
      ) : (
        <div className="flex flex-col gap-6">
          {time && <TimeInfoCard time={time} />}
          <SummaryCards
            categoriesCount={categories.length}
            subCategoriesCount={subCategories.length}
            teamsCount={teams.length}
          />
          <div className="grid gap-4 grid-cols-1 md:grid-cols-2">
            <div>
              <CategoryBarChart data={categories} />
            </div>
            <div>
              <CategoryLineChart
                data={categories.map((cat, index) => ({
                  name: cat.name,
                  value: cat.count + index,
                }))}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
