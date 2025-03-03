import React from "react";

interface SummaryProps {
  categoriesCount: number;
  subCategoriesCount: number;
  teamsCount: number;
}

const SummaryCards: React.FC<SummaryProps> = ({
  categoriesCount,
  subCategoriesCount,
  teamsCount,
}) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <div className="flex flex-col items-center bg-green-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
        <h3 className="text-4xl font-bold">{categoriesCount}</h3>
        <p className="mt-2 text-lg font-semibold">Total Categories</p>
      </div>
      <div className="flex flex-col items-center bg-purple-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
        <h3 className="text-4xl font-bold">{subCategoriesCount}</h3>
        <p className="mt-2 text-lg font-semibold">Total SubCategories</p>
      </div>
      <div className="flex flex-col items-center bg-orange-600 p-6 rounded-lg text-white shadow-md transition-transform transform hover:scale-105">
        <h3 className="text-4xl font-bold">{teamsCount}</h3>
        <p className="mt-2 text-lg font-semibold">Total Teams</p>
      </div>
    </div>
  );
};

export default SummaryCards;
