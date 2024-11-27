import { useState } from "react";

export default function YearSelector({currentMonth, setSelectorMonth}) {
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const monthsOfYear = ["01","02","03","04","05","06","07","08","09","10","11","12"]

  return (
    <div 
      className="mx-auto border-b-2 p-2 h-full"
      onClick={(e) => e.stopPropagation()}
    >
      {/* 상단 컨트롤 */}
      <div className="flex justify-between items-center mb-4 h-8">
        <div className="text-lg font-bold w-full text-center">{selectedMonth}월</div>
      </div>

      {/* 년도 그리드 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {monthsOfYear.map((month, index) => (
          <button
            key={index}
            className={`py-2 text-center rounded-lg ${
              month === selectedMonth
                ? 'bg-gray-100 text-green-500 font-bold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={
              () => {
                setSelectedMonth(month);
                setSelectorMonth(month);
              }}
          >
            {month}월
          </button>
        ))}
      </div>
    </div>
  );
}