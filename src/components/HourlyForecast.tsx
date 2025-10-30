import WeatherModel from "@/models/WeatherModel";
import WeatherIcon from "./WeatherCodeIcon";
import { useState } from "react";
import DropdownDays from "./DropdownDays";

export default function HourlyForecast({
  hourlyForecast,
}: {
  hourlyForecast: WeatherModel["hourly"] | null;
}) {
  const [selectDay, setSelectDay] = useState<string>(
    new Date().toLocaleDateString("en-US", {
      weekday: "long",
    })
  );

  const filteredHourlyForecast =
    hourlyForecast?.time.reduce((acc: number[], curr, i) => {
      const date = new Date(curr);
      const weekday = date.toLocaleDateString("en-US", {
        weekday: "long",
      });
      const day = date.toLocaleDateString("en-US", {
        day: "numeric",
      });

      if (
        weekday === selectDay &&
        parseInt(day) -
          parseInt(new Date().toLocaleDateString("en-US", { day: "numeric" })) <
          7
      )
        acc.push(i);
      return acc;
    }, []) || [];

  return (
    <div className="flex flex-col md:w-full lg:w-[384px] h-[741px] overflow-hidden gap-4 rounded-[20px] bg-neutral-800 pl-6 py-6">
      <div className="flex w-full justify-between pr-6">
        <p className="font-dm-sans text-[20px]">Hourly forecast</p>
        <DropdownDays
          selectDay={selectDay}
          setSelectDay={setSelectDay}
          hourlyForecast={hourlyForecast}
        />
      </div>
      <div className="flex flex-col scrollbar overflow-y-scroll gap-y-4 pr-5">
        {hourlyForecast
          ? filteredHourlyForecast.map((i) => {
              return (
                <div
                  key={i}
                  className="flex bg-neutral-700 border-1 border-neutral-600 rounded-lg px-3 py-2.5 items-center justify-between"
                >
                  <div className="flex items-center gap-2">
                    <WeatherIcon
                      weatherCode={hourlyForecast.weather_code?.[i] || 0}
                      width={40}
                      height={40}
                    />
                    <span className="font-dm-sans text-[20px]">
                      {new Date(hourlyForecast.time[i]).toLocaleTimeString(
                        "en-US",
                        {
                          hour: "numeric",
                        }
                      )}
                    </span>
                  </div>
                  <span className="font-dm-sans text-[16px]">
                    {hourlyForecast.apparent_temperature?.[i]?.toFixed(0)}°
                  </span>
                </div>
              );
            })
          : Array.from({ length: 12 }).map((_, i) => (
              <div
                key={i}
                className="flex bg-neutral-700 border-1 border-neutral-600 rounded-lg px-3 py-2.5 items-center justify-between"
              >
                <div className="flex items-center gap-2">
                  <WeatherIcon
                    className="invisible"
                    weatherCode={0}
                    width={40}
                    height={40}
                  />
                </div>
              </div>
            ))}
      </div>
    </div>
  );
}
