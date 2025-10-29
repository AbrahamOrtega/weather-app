import WeatherIcon from "./WeatherCodeIcon";
import WeatherModel from "@/models/WeatherModel";

export default function DailyForecast({
  dailyForecast,
}: {
  dailyForecast: WeatherModel["daily"] | null;
}) {
  return (
    <div className="flex flex-col mt-12 gap-5">
      <h3 className="font-dm-sans text-[20px] font-semibold">Daily forecast</h3>
      <div className="flex gap-4 overflow-x-auto scrollbar">
        {dailyForecast
          ? dailyForecast.time.map((_, i) => (
              <div
                key={i}
                className="flex flex-col grow items-center py-4 px-2.5 gap-4 rounded-xl bg-neutral-800 border-2 border-neutral-600"
              >
                <p className="font-dm-sans font-medium text-[18px]">
                  {new Date(dailyForecast.time[i]).toLocaleDateString("en-US", {
                    weekday: "short",
                  })}
                </p>
                <WeatherIcon
                  weatherCode={dailyForecast.weather_code?.[i] || 0}
                  width={60}
                  height={60}
                />
                <div className="flex justify-between w-full font-dm-sans text-[18px] font-medium">
                  <span>
                    {dailyForecast.apparent_temperature_max?.[i]?.toFixed(0)}°
                  </span>
                  <span className="text-neutral-200">
                    {dailyForecast.apparent_temperature_min?.[i]?.toFixed(0)}°
                  </span>
                </div>
              </div>
            ))
          : Array.from({ length: 7 }).map((_, i) => (
              <div
                key={i}
                className="flex flex-col h-[182px] grow items-center py-4 px-2.5 gap-4 rounded-xl bg-neutral-800 border-2 border-neutral-600"
              />
            ))}
      </div>
    </div>
  );
}
