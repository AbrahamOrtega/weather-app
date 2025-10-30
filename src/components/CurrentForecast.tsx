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
      <div
        className={`flex w-full rounded-[20px] bg-cover ${
          currentForecast
            ? "bg-[url('/assets/bg-today-small.svg')] md:bg-[url('/assets/bg-today-large.svg')]"
            : "bg-neutral-800"
        }  h-[286px] md:justify-between md:gap-0 items-center px-6 md:py-20`}
      >
        {currentForecast ? (
          <div className="flex flex-col md:flex-row w-full gap-4 md:justify-between items-center md:px-6 md:py-20">
            <div className="flex flex-col text-center md:text-left">
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

            <div className="flex items-center gap-5">
              <WeatherIcon
                weatherCode={currentForecast.weather_code || 0}
                width={96}
                height={96}
              />
              <h1 className="font-dm-sans text-8xl">
                {currentForecast.temperature_2m.toFixed(0)}°
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-3.5 w-full h-full justify-center items-center">
            <div className="flex gap-2.5">
              <div className="w-3 h-3 rounded-full bg-neutral-0 opacity-80 animate-bounce" />
              <div className="w-3 h-3 rounded-full bg-neutral-0 opacity-80 animate-bounce [animation-delay:150ms]" />
              <div className="w-3 h-3 rounded-full bg-neutral-0 opacity-80 animate-bounce [animation-delay:300ms]" />
            </div>
            <span className="text-neutral-200">Loading...</span>
          </div>
        )}
      </div>
      {/* Weather Details Card */}
      <div className="grid grid-flow-row grid-cols-2 md:flex w-full mt-8 gap-6">
        {/* Temperature */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">
            Feels Like
          </p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast
              ? `${currentForecast?.apparent_temperature.toFixed(0)}°`
              : "-"}
          </p>
        </div>
        {/* Humidity */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">Humidity</p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast
              ? `${currentForecast?.relative_humidity_2m}%`
              : "-"}
          </p>
        </div>
        {/* Winnd */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">Wind</p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast
              ? `${currentForecast?.wind_speed_10m.toFixed(0)} ${
                  unitConf.windSpeed === "kmh" ? "km/h" : "mph"
                }`
              : "-"}
          </p>
        </div>
        {/* Precipitation */}
        <div className="flex w-full flex-col rounded-xl gap-6 bg-neutral-800 p-5 border-2 border-neutral-600">
          <p className="font-dm-sans text-[18px] text-neutral-200">
            Precipitation
          </p>
          <p className="font-dm-sans text-[32px]">
            {currentForecast
              ? `${
                  parseFloat(currentForecast?.precipitation.toFixed(1)) > 0
                    ? currentForecast?.precipitation.toFixed(1)
                    : 0
                } ${unitConf.precipitation === "mm" ? "mm" : "in"}`
              : "-"}
          </p>
        </div>
      </div>

      {/* Daily Forecast Card */}
      <DailyForecast dailyForecast={dailyForecast || null} />
    </div>
  );
}
