import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/dark.css";

const DateSelector = ({ onDateSelect }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showFlatpickr, setShowFlatpickr] = useState(false);

  const handleChange = (date) => {
    const formattedDate = formatDate(date[0]);
    setSelectedDate(date[0]);
    setShowFlatpickr(false);
    onDateSelect(formattedDate);
  };

  const toggleFlatpickr = () => {
    setShowFlatpickr(!showFlatpickr);
  };

  const formatDate = (date) => {
    const myDate = date;
    // Format the date as "YYYY-MM-DD"
    const year = myDate.getFullYear();
    const month = String(myDate.getMonth() + 1).padStart(2, "0");
    const day = String(myDate.getDate()).padStart(2, "0");
    const formattedDate = `${year}-${month}-${day}`;

    return formattedDate;
  };

  const handleDateClick = (date) => {
    const x = formatDate(date);
    onDateSelect(x);
    setSelectedDate(date);
    setShowFlatpickr(false);
  };

  const generateDates = (selectedDate) => {
    const dates = [];
    const currentDate = new Date(selectedDate);

    for (let i = -3; i <= 3; i++) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  return (
    <div className="flex gap-3 justify-center items-center">
      {generateDates(selectedDate).map((date, index) => (
        <div
          key={index}
          className={`flex flex-col font-semibold text-sm p-1 cursor-pointer rounded-full items-center  justify-center w-[6.5rem] h-[4rem] hover:bg-gray-400 transition-colors ${
            date.toDateString() === selectedDate.toDateString()
              ? "bg-blue-600 text-white font-bold"
              : "bg-gray-300 text-gray-600"
          }`}
          onClick={() => handleDateClick(date)}
        >
          {index === 3 && <p className="font-bold text-white block">Today</p>}
          <p>
            {date.getDate()}{" "}
            {date.toLocaleString("default", { month: "short" })}
            {", "}
            {date.toLocaleString("default", { year: "2-digit" })}
          </p>{" "}
        </div>
      ))}
      <div className="relative">
        <FaCalendarAlt
          className="w-[6.5rem] h-[4rem] text-md p-4 rounded-full bg-gray-600 text-white cursor-pointer hover:bg-gray-500 transition-colors"
          onClick={toggleFlatpickr}
        />
        {showFlatpickr && (
          <div className="absolute right-0">
            <Flatpickr
              value={selectedDate}
              onChange={handleChange}
              options={{
                inline: true,
              }}
              className="hidden"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default DateSelector;
