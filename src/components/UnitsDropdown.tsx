import Image from "next/image";
import UnitConfModel from "@/models/UnitConfModel";
import { useState } from "react";

export default function UnitsDropdown({
  unitConf,
  setUnitConf,
}: {
  unitConf: UnitConfModel;
  setUnitConf: (unitConf: UnitConfModel) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleUnits = () => {
    if (
      unitConf.temperature !== "celsius" ||
      unitConf.windSpeed !== "kmh" ||
      unitConf.precipitation !== "mm"
    ) {
      setUnitConf({
        temperature: "celsius",
        windSpeed: "kmh",
        precipitation: "mm",
      });
    } else {
      setUnitConf({
        temperature: "fahrenheit",
        windSpeed: "mph",
        precipitation: "inch",
      });
    }
    toggleDropdown();
  };

  return (
    <div className="flex flex-col">
      <button
        className="flex items-center gap-2.5 rounded-lg bg-neutral-800 hover:bg-neutral-700 px-4 py-3 text-white"
        onClick={toggleDropdown}
      >
        <Image
          className="flex w-[14px] h-[14px] md:w-4 md:h-4"
          src="/assets/icon-units.svg"
          alt="Units"
          width={16}
          height={16}
        />
        <span className="text-sm md:text-base font-dm-sans">Units</span>
        <Image
          className="flex w-[14px] h-[14px] md:w-4 md:h-4"
          src="/assets/icon-dropdown.svg"
          alt="Chevron Down"
          width={16}
          height={16}
        />
      </button>
      {isOpen && (
        <div className="flex flex-col w-56 absolute z-20 translate-y-14 -translate-x-26 rounded-xl bg-neutral-800 border border-neutral-600 py-1.5 px-2 p-1">
          <button
            className="flex px-2 py-2.5 hover:bg-neutral-700 rounded-lg"
            onClick={toggleUnits}
          >
            {unitConf.temperature !== "celsius" ||
            unitConf.windSpeed !== "kmh" ||
            unitConf.precipitation !== "mm"
              ? "Switch Metric"
              : "Switch Imperial"}
          </button>
          <div className="flex flex-col gap-y-1">
            <p className="flex pt-1.5 px-2 mb-2 text-neutral-300 text-sm">
              Temperature
            </p>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.temperature === "celsius" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  temperature: "celsius",
                })
              }
            >
              <p>Celsius (°C)</p>
              {unitConf.temperature === "celsius" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.temperature === "fahrenheit" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  temperature: "fahrenheit",
                })
              }
            >
              <p>Fahrenheit (°F)</p>
              {unitConf.temperature === "fahrenheit" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
          </div>
          <div className="flex w-full h-[1px] bg-neutral-600 my-1"></div>
          <div className="flex flex-col gap-y-1">
            <p className="flex pt-1.5 px-2 mb-2 text-neutral-300 text-sm">
              Wind Speed
            </p>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.windSpeed === "kmh" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  windSpeed: "kmh",
                })
              }
            >
              <p>km/h</p>
              {unitConf.windSpeed === "kmh" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.windSpeed === "mph" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  windSpeed: "mph",
                })
              }
            >
              <p>mph</p>
              {unitConf.windSpeed === "mph" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
          </div>
          <div className="flex w-full h-[1px] bg-neutral-600 my-1"></div>
          <div className="flex flex-col gap-y-1">
            <p className="flex pt-1.5 px-2 mb-2 text-neutral-300 text-sm">
              Precipitation
            </p>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.precipitation === "mm" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  precipitation: "mm",
                })
              }
            >
              <p>Milimeters (mm)</p>
              {unitConf.precipitation === "mm" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
            <button
              className={`flex justify-between items-center py-2.5 px-2 hover:bg-neutral-700 rounded-lg ${
                unitConf.precipitation === "inch" && "bg-neutral-700"
              }`}
              onClick={() =>
                setUnitConf({
                  ...unitConf,
                  precipitation: "inch",
                })
              }
            >
              <p>Inches (in)</p>
              {unitConf.precipitation === "inch" && (
                <Image
                  src="/assets/icon-checkmark.svg"
                  alt="Check"
                  width={16}
                  height={16}
                />
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
