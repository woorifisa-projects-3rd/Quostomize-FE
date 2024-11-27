'use client'

import { useState, useEffect } from "react";
import YearSelector from "./yearSelector";
import MonthSelector from "./monthSelector";

const Calendar = ({date, setDate, setDrawerOpen}) => {
  const todayYear = date.slice(0,4);
  const todayMonth = date.slice(5,7);
  const todayDay = date.slice(8,10);
  const intTodayDay = parseInt(todayDay);
  const daysOfWeek = ['일', '월', '화', '수', '목', '금', '토'];
  
  // 상태 통합 및 단순화
  const [selectedMonthAndYear, setSelectedMonthAndYear] = useState({
    year: date.slice(0,4), 
    month: date.slice(5,7)
  }); 

  const [calendarDays, setCalendarDays] = useState([]);
  const [selectorOpen, setSelectorOpen] = useState(false);
  const [selectorMonth, setSelectorMonth] = useState(todayMonth);
  const [selectorYear, setSelectorYear] = useState(todayYear);
  const [selectedDay, setSelectedDay] = useState(todayDay);

  // 윤년 확인 함수
  const isLeapYear = (year) => {
    return (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
  };

  // 달의 일수를 반환하는 함수
  const getDaysInMonth = (year, month) => {
    const monthDays = {
      1: 31, 2: isLeapYear(year) ? 29 : 28, 3: 31,
      4: 30, 5: 31, 6: 30, 7: 31, 8: 31,
      9: 30, 10: 31, 11: 30, 12: 31
    };
    return monthDays[month];
  };

  // 달력 업데이트
  const updateCalendar = (year, month) => {
    const firstDayOfMonth = new Date(year, month-1, 1);
    const startOffset = firstDayOfMonth.getDay();
    const daysInMonth = getDaysInMonth(Number(year), Number(month));
    
    const daysArray = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const updatedCalendarDays = [
      ...Array.from({ length: startOffset }, () => null),
      ...daysArray,
    ];

    setCalendarDays(updatedCalendarDays);
  };

  // 이전 달로
  const toPreviousMonth = () => {
    setSelectedMonthAndYear(prev => {
      const currentMonth = parseInt(prev.month, 10);
      const currentYear = parseInt(prev.year, 10);
      
      if (currentMonth === 1) {
        return {
          year: String(currentYear - 1),
          month: "12"
        };
      }
      
      const newMonth = String(currentMonth - 1).padStart(2, '0');
      return {
        ...prev,
        month: newMonth
      };
    });
  };

  // 다음 달로
  const toNextMonth = () => {
    setSelectedMonthAndYear(prev => {
      const currentMonth = parseInt(prev.month, 10);
      const currentYear = parseInt(prev.year, 10);
      
      if (currentMonth === 12) {
        return {
          year: String(currentYear + 1),
          month: "01"
        };
      }
      
      const newMonth = String(currentMonth + 1).padStart(2, '0');
      return {
        ...prev,
        month: newMonth
      };
    });
  };

  const closeSelector = () => {
    setSelectorMonth(todayMonth);
    setSelectorYear(todayYear);
    setSelectorOpen(false);
    setSelectedMonthAndYear((prev) => {
      return {
        ...prev,
        year: selectorYear,
        month: selectorMonth
      }
    })
  };

  // 달력 날짜 업데이트
  useEffect(() => {
    updateCalendar(
      parseInt(selectedMonthAndYear.year), 
      parseInt(selectedMonthAndYear.month)
    );
  }, [selectedMonthAndYear]);

  useEffect(() => {
    setDate((prev) => {
      let newDay = `${selectedDay}`;
      if (newDay.length === 1) {
        newDay = "0"+newDay;
      }
      const newDate = `${selectorYear}-${selectorMonth}-${newDay}`;
      if (newDate === prev) {
        return prev;
      } else {
        return newDate;
      }
    })
  },[selectedDay])


  return (
      <div 
        className="w-full flex justify-center"
        onClick={() => {setSelectorOpen(false)}}
      >
          <div className="p-4 bg-transparent text-opacity-50 rounded-lg w-full px-10 select-none">
              <div className="flex relative justify-between items-center text-lg mb-10">
                <div
                  className="cursor-pointer"
                  onClick={() => {toPreviousMonth()}}
                >
                  <span className="material-icons">arrow_back_ios</span>
                </div>
                <div 
                  className="text-xl font-bold cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectorOpen((prev) => !prev);
                  }}
                >
                  {selectedMonthAndYear.year}년 {selectedMonthAndYear.month}월
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {toNextMonth()}}
                >
                  <span className="material-icons">arrow_forward_ios</span>
                </div>
                {
                  selectorOpen === true
                  ?
                    <div 
                      className="absolute w-96 h-80 translate-x-6 translate-y-48 rounded-xl bg-white/75 shadow-lg shadow-[rgba(31,38,135,0.37)] backdrop-blur-[6.5px]"
                      onClick = {(e) => {e.stopPropagation()}}  
                    >
                      <div className="flex">
                        {/* 년도 선택 */}
                        <div className="flex-1">
                          <YearSelector setSelectorYear={setSelectorYear} />
                        </div>
                        <div className="flex-1">
                          <MonthSelector setSelectorMonth={setSelectorMonth} currentMonth={todayMonth}/>
                        </div>
                      </div>
                        <div className="flex w-full px-4 justify-around">
                          <div
                            className="cursor-pointer"
                            onClick={() => {
                              setSelectedMonthAndYear((prev) => {
                                return {
                                  ...prev,
                                  year: selectorYear,
                                  month: selectorMonth
                                }
                              })
                              closeSelector();
                            }}
                          >
                            확인
                          </div>
                          <div
                            className="cursor-pointer"
                            onClick={() => {setSelectorOpen(false)}}
                          >
                            취소
                          </div>
                        </div>
                    </div>
                  :
                    <></>
                }
              </div>
              <div className="grid grid-cols-7 text-center place-items-center gap-1">
                  {daysOfWeek.map((day, idx) => (
                      <div 
                        key={idx} 
                        className={`font-bold h-8 aspect-square ${day === '토' || day === '일' ? 'color1 text-opacity-75' : ''}`}
                        >
                          {day}
                      </div>
                  ))}
                  {Array.from({ length: Math.ceil(calendarDays.length / 7) }).map((_, weekIdx) => (
                      <div key={weekIdx} className="contents">
                          {calendarDays.slice(weekIdx * 7, weekIdx * 7 + 7).map((day, idx) => (
                              <div
                                  key={idx}
                                  title={day?.toString()}
                                  className={`h-8 aspect-square flex-col justify-center rounded-md `}
                                  onClick = {() => {
                                    setSelectedDay((prev) => {
                                      if (day) {
                                        let stringDay = `${day}`;
                                        setDrawerOpen(false);
                                        if (day.length === 1) {
                                          return "0"+stringDay
                                        } else {
                                          return stringDay;
                                        }
                                      } else {
                                        return prev;
                                      }
                                    });
                                  }
                              }
                              >
                                  <div
                                    className= {`h-8 aspect-square rounded-full leading-8
                                      ${
                                        selectedMonthAndYear.year === todayYear && selectedMonthAndYear.month === todayMonth && intTodayDay === day
                                        ? "bg-[#3384f6] text-white"
                                        : ""
                                      }
                                      ${
                                        day
                                        ?  "cursor-pointer hover:bg-slate-400 hover:text-white active:bg-slate-600 active:text-white"
                                        : ""
                                      }`
                                    }
                                  >
                                    {day || ''}
                                  </div>
                              </div>
                          ))}
                          <div className="col-span-7 h-[1px] bg-black opacity-10"></div>
                      </div>
                  ))}
                </div>
          </div>
      </div>
  );
};

export default Calendar;