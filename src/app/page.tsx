"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import getForecast from "@/services/Forecast";
import WeatherModel from "@/models/WeatherModel";
import CurrentForecast from "@/components/CurrentForecast";
import HourlyForecast from "@/components/HourlyForecast";
import SearchBar from "@/components/SearchBar";
import UnitsDropdown from "@/components/UnitsDropdown";
import UnitConfModel from "@/models/UnitConfModel";
import ApiError from "@/components/ApiError";

export default function Home() {
  const [forecast, setForecast] = useState<WeatherModel | null>(null);
  const [error, setError] = useState<boolean>(false);
  const [latitude, setLatitude] = useState<number>(52.52); // 52.52
  const [longitude, setLongitude] = useState<number>(13.41); // 13.41
  const [city, setCity] = useState<string>("Berlin"); // Berlin
  const [country, setCountry] = useState<string>("Germany"); // Germany
  const [noResults, setNoResults] = useState(false);
  const [unitConf, setUnitConf] = useState<UnitConfModel>({
    temperature: "celsius",
    windSpeed: "kmh",
    precipitation: "mm",
  }); // metric

  useEffect(() => {
    setForecast(null);
    // fetch forecast when coordinates change
    const fetchForecast = async () => {
      if (latitude && longitude) {
        try {
          const data = await getForecast(latitude, longitude, unitConf);
          setForecast(data);
        } catch (err) {
          console.error(err);
          setError(true);
        }
      }
    };

    fetchForecast();
  }, [latitude, longitude, unitConf]);

  return (
    <div className="flex flex-col p-4 md:px-6 md:py-6 xl:px-28 xl:py-12">
      <div className="flex w-full justify-between items-center">
        <Image
          className="flex w-[138px] h-[28px] md:w-[196px] md:h-[40px]"
          src="/assets/logo.svg"
          alt="Menu"
          width={196}
          height={40}
        />
        <UnitsDropdown unitConf={unitConf} setUnitConf={setUnitConf} />
      </div>
      {!error ? (
        <div className="flex flex-col">
          <div className="flex w-full my-12 md:my-16 text-center justify-center text-[52px] font-bricolage-grotesque">
            How&apos;s the sky looking today?
          </div>

          {/* SearchBar */}
          <SearchBar
            setLatitude={setLatitude}
            setLongitude={setLongitude}
            setCity={setCity}
            setCountry={setCountry}
            setForecast={setForecast}
            setNoResults={setNoResults}
            setError={setError}
          />

          {noResults ? (
            <div className="flex w-full justify-center mt-12 text-center font-bold text-[28px]">
              <h3>No search result found!</h3>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row w-full mt-8 md:mt-12 gap-8">
              {/* Current Forecast Card */}
              <CurrentForecast
                currentForecast={forecast?.current || null}
                dailyForecast={forecast?.daily || null}
                city={city}
                country={country}
                unitConf={unitConf}
              />
              {/* Hourly Forecast Card */}
              <HourlyForecast hourlyForecast={forecast?.hourly || null} />
            </div>
          )}
        </div>
      ) : (
        <ApiError />
      )}
    </div>
  );
}
