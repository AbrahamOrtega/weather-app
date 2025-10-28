import DailyForecast from "./DailyForecast";
import WeatherModel from "@/models/WeatherModel";
import WeatherIcon from "./WeatherCodeIcon";
import UnitsConfModel from "@/models/UnitConfModel";
export default function CurrentForecast({
  currentForecast,
  dailyForecast,
  city,
  country,
  unitConf,
}: {
  currentForecast: WeatherModel["current"] | null;
  dailyForecast: WeatherModel["daily"] | null;
  city: string;
  country: string;
  unitConf: UnitsConfModel;
}) {
  return (
    <div className="flex flex-col flex-grow">
      {/* Today's Weather Card */}
      <div className="flex w-full rounded-[20px] bg-cover bg-[url('/assets/bg-today-large.svg')] h-[286px] justify-between items-center px-6 py-20">
        <div className="flex flex-col">
          <h3 className="text-[28px] font-bold font-dm-sans">
            {`${city}, ${country}`}
          </h3>
          <p className="text-lg font-dm-sans font-medium text-neutral-0 opacity-80">
            {`${new Date().toLocaleDateString("en-US", {
              weekday: "long",
            })}, ${new Date().toLocaleDateString("en-US", {
              month: "short",
            })}
             ${new Date().toLocaleDateString("en-US", {
               day: "numeric",
             })}, ${new Date().toLocaleDateString("en-US", {
              year: "numeric",
            })}`}
          </p>
        </div>

        <div className="flex gap-5">
          <WeatherIcon
            weatherCode={currentForecast?.weather_code || 0}
            width={96}
            height={96}
          />
          <h1 className="font-dm-sans text-8xl">
            {currentForecast?.temperature_2m.toFixed(0)}°
          </h1>
        </div>
      </div>
      {/* Weather Details Card */}
      <div className="flex w-full mt-8 gap-6">
        {/* Temperature */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">
            Feels Like
          </p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast?.apparent_temperature.toFixed(0)}°
          </p>
        </div>
        {/* Humidity */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">Humidity</p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast?.relative_humidity_2m}%
          </p>
        </div>
        {/* Winnd */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">Wind</p>
          <p className="font-dm-sans text-[32px]">
            {`${currentForecast?.wind_speed_10m.toFixed(0)} ${
              unitConf.windSpeed === "kmh" ? "km/h" : "mph"
            }`}
          </p>
        </div>
        {/* Precipitation */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">
            Precipitation
          </p>
          <p className="font-dm-sans text-[32px]">
            {`${currentForecast?.precipitation.toFixed(1)} ${
              unitConf.precipitation === "mm" ? "mm" : "in"
            }`}
          </p>
        </div>
      </div>

      {/* Daily Forecast Card */}
      <DailyForecast dailyForecast={dailyForecast || null} />
    </div>
  );
}
