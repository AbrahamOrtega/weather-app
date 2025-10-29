import GeocodingModel from "@/models/GeocodingModel";
import Image from "next/image";
import { useState, useEffect } from "react";
import getGeocoding from "@/services/Geocoding";

export default function SearchBar({
  setLatitude,
  setLongitude,
  setCity,
  setCountry,
}: {
  setLatitude: (latitude: number) => void;
  setLongitude: (longitude: number) => void;
  setCity: (city: string) => void;
  setCountry: (country: string) => void;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [searchResults, setSearchResults] = useState<GeocodingModel[] | null>(
    null
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const fetchGeocoding = async () => {
      const data = await getGeocoding(input);
      setSearchResults(data);
    };

    if (input.length > 1) fetchGeocoding();
    else setSearchResults(null);
  }, [input]);

  const selectPlace = (result: GeocodingModel) => {
    setLatitude(result.latitude);
    setLongitude(result.longitude);
    setCity(result.name);
    setCountry(result.country);
    setInput("");
  };

  return (
    <div className="flex w-full justify-center gap-4">
      <div className="flex w-[526px] relative rounded-lg items-center gap-4 px-6 py-4.5 bg-neutral-800 hover:bg-neutral-700">
        <Image
          src="/assets/icon-search.svg"
          alt="Search"
          width={20}
          height={20}
        />
        <input
          type="text"
          placeholder="Search for a place..."
          onBlur={toggleDropdown}
          onFocus={toggleDropdown}
          onChange={(e) => setInput(e.target.value)}
          value={input}
          className="flex grow text-xl bg-transparent font-dm-sans text-neutral-0 placeholder:text-neutral-200 focus:outline-none"
        />
        {isOpen && input.length > 0 && (
          <div className="flex flex-col w-[526px] absolute top-18 rounded-xl  -translate-x-6 p-2 bg-neutral-800 border border-neutral-700 gap-1">
            {searchResults ? (
              searchResults.map((result) => (
                <button
                  key={result.id}
                  className="flex px-2 py-2.5 border border-transparent hover:border-neutral-600 hover:bg-neutral-700 rounded-lg"
                  onMouseDown={() => selectPlace(result)}
                >
                  {result.name}, {result.country}
                </button>
              ))
            ) : (
              <div className="flex px-2 py-2.5 border border-transparent gap-2.5">
                <Image
                  src="/assets/icon-loading.svg"
                  alt="Loading"
                  width={16}
                  height={19}
                  className="animate-[spin_3s_linear_infinite]"
                />
                <p>Search in progress</p>
              </div>
            )}
          </div>
        )}
      </div>
      <button className="flex items-center text-xl rounded-lg bg-blue-500 hover:bg-blue-700 px-6 py-4 border border-transparent">
        Search
      </button>
    </div>
  );
}
