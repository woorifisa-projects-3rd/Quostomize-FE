import { useState, useEffect } from 'react';

export default function YearSelector({setSelectorYear}) {
  const [currentYear, setCurrentYear] = useState(2024); // 현재 선택된 년도
  const [startYear, setStartYear] = useState(2024);
  const [years, setYears] = useState(Array.from({ length: 12 }, (_, i) => startYear + i)); // 12개의 연속된 년도 배열

  const handleYearClick = (year) => {
    setCurrentYear(year);
    setSelectorYear(year);
  };

  useEffect(() => {
    setYears(Array.from({ length: 12 }, (_, i) => startYear + i))
  },[startYear])

  return (
    <div 
      className="mx-auto border-r-2 p-2 h-full"
      onClick={(e) => e.stopPropagation}
    >
      {/* 상단 컨트롤 */}
      <div className="flex justify-between items-center mb-4 h-8">
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => {
            setStartYear((prev) => prev - 12);
          }}
        >
          &lt;
        </button>
        <div className="text-lg font-bold">{startYear}년~{startYear+12}년</div>
        <button
          className="text-gray-500 hover:text-gray-700"
          onClick={() => {
            setStartYear((prev) => prev + 12);
          }}
        >
          &gt;
        </button>
      </div>

      {/* 년도 그리드 */}
      <div className="grid grid-cols-3 gap-4 mt-4">
        {years.map((year) => (
          <button
            key={year}
            className={`py-2 text-center rounded-lg ${
              year === currentYear
                ? 'bg-gray-100 text-green-500 font-bold'
                : 'text-gray-600 hover:bg-gray-50'
            }`}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}