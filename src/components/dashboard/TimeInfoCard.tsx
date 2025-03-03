import React from "react";

interface TimeInfoProps {
  time: {
    timezone: string;
    time: string;
    day: string;
    date: string;
  };
}

const TimeInfoCard: React.FC<TimeInfoProps> = ({ time }) => {
  return (
    <div className="w-full max-w-md border-l-8 border-blue-600 bg-white rounded-lg shadow-lg p-5">
      <h2 className="text-lg font-semibold">
        Timezone:
        <span className="text-blue-500 text-sm ml-2">{time.timezone}</span>
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
  );
};

export default TimeInfoCard;
