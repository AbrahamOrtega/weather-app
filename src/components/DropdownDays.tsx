import Image from "next/image";
import { useState } from "react";
import WeatherModel from "@/models/WeatherModel";

export default function DropdownDays({
  selectDay,
  setSelectDay,
  hourlyForecast,
}: {
  selectDay: string;
  setSelectDay: (day: string) => void;
  hourlyForecast: WeatherModel["hourly"] | null;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const DaysList = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];

  return (
    <div className="flex flex-col">
      <button
        className="flex w-fit h-fit items-center rounded-lg bg-neutral-600 px-4 py-2 gap-3"
        onClick={toggleDropdown}
      >
        <p>{hourlyForecast ? selectDay : "-"}</p>
        <Image
          src="/assets/icon-dropdown.svg"
          alt="Chevron Down"
          width={12}
          height={12}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col w-48 z-10 translate-y-12 -translate-x-18 rounded-xl absolute bg-neutral-800 border border-neutral-600 p-2 gap-1">
          {DaysList.map((item) => {
            return (
              <button
                key={item}
                onClick={() => {
                  setSelectDay(item);
                  toggleDropdown();
                }}
                className="flex px-2 py-2.5 hover:bg-neutral-700 rounded-lg"
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
