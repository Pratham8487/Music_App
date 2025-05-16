import { useQuery } from "@tanstack/react-query";
import { IoSearchOutline } from "react-icons/io5";
import { fetchTrackDetails, SearchTrackDetails } from "../api/Api";
import type { ApiResponse } from "../types/types";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [inputValue, setInputValue] = useState("");
  const [searchTerm, setSearchTerm] = useState("Indian Bollywood");

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["Infos"],
    queryFn: fetchTrackDetails,
  });

  const {
    data: searchResults,
    isPending: searchPending,
    isError: searchIsError,
    error: searchError,
  } = useQuery<ApiResponse>({
    queryKey: ["searchTrack", searchTerm],
    queryFn: () => SearchTrackDetails(searchTerm),
    enabled: searchTerm.length > 0,
    staleTime: 50000,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInputValue(value);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (inputValue.trim()) {
        setSearchTerm(inputValue);
      }
    }, 1500);

    return () => clearTimeout(timer);
  }, [inputValue]);

  if (isPending && !searchTerm) {
    return <p className="text-center mt-10 text-gray-300">Loading state...</p>;
  }

  if (isError && !searchTerm) {
    return (
      <p className="text-center mt-10 text-red-500">
        Error: {error instanceof Error ? error.message : "Unknown error"}
      </p>
    );
  }

  const displayData = searchTerm ? searchResults : data;
  const isLoading = searchTerm ? searchPending : isPending;
  const hasError = searchTerm ? searchIsError : isError;
  const errorMessage = searchTerm
    ? searchError instanceof Error
      ? searchError.message
      : "Unknown search error"
    : error instanceof Error
    ? error.message
    : "Unknown error";

  return (
    <div className="flex flex-col items-center justify-center p-6 space-y-6 min-h-screen">
      <div className="w-full max-w-xl">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <IoSearchOutline className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={inputValue}
            onChange={handleInputChange}
            className="bg-zinc-900 border border-zinc-700 text-white text-sm rounded-full block w-full pl-10 pr-4 py-2.5 focus:outline-none focus:ring-1 focus:ring-gray-500"
            placeholder="What do you want to play?"
          />
        </div>
      </div>

      {searchTerm && (
        <div className="w-full max-w-xl text-white">
          <p className="text-sm font-mono">
            Showing results for:{" "}
            <span className="font-bold">"{searchTerm}"</span>
          </p>
        </div>
      )}

      {isLoading ? (
        <p className="text-center text-gray-300">Searching...</p>
      ) : hasError ? (
        <p className="text-center text-red-500">Error: {errorMessage}</p>
      ) : (
        <div className="w-full max-w-4xl bg-zinc-800 text-white p-4 rounded-xl shadow-lg overflow-auto scrollbar-hide max-h-[500px]">
          {searchTerm && searchResults && searchResults.data ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-3">
              {searchResults.data.map((track) => (
                <div
                  key={track.id}
                  className="bg-zinc-700 p-3 rounded-lg flex flex-col justify-between"
                >
                  <img
                    src={track.album.cover_medium}
                    alt={track.title}
                    className="w-full h-40 object-cover rounded-md mb-2"
                  />
                  <h3 className="font-bold text-white text-wrap">
                    {track.title}
                  </h3>
                  <p className="text-gray-300 text-sm">{track.artist.name}</p>
                  <p className="text-gray-400 text-xs">{track.album.title}</p>
                  <audio
                    src={track.preview}
                    controls
                    loop
                    preload="metadata"
                    className="w-full mt-2 bg-gray-300 text-shadow-black"
                  />
                </div>
              ))}
              {/* {JSON.stringify(displayData, null, 2)} */}
            </div>
          ) : (
            <pre className="whitespace-pre-wrap text-sm">
              {JSON.stringify(displayData, null, 2)}
            </pre>
          )}
        </div>
      )}
    </div>
  );
};

export default HomePage;
