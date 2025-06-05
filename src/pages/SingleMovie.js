import React from "react";
import { useParams } from "react-router-dom";
import { FetchSingleMovie } from "../api/fetchSingleMovie";
import { CiHeart } from "react-icons/ci";
import { useMovie } from "../Hooks/MovieContext";

export default function SingleMovie() {
  const { id } = useParams();
  const { setpara, favoritelists, setfavorite } = useMovie();

  const { singlemoviedata, singlemoviedataloading } = FetchSingleMovie(id);

  console.log(favoritelists);
  return (
    <div className="px-4 py-8">
      {singlemoviedataloading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-indigo-600"></div>
        </div>
      ) : (
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 flex flex-col md:flex-row gap-6">
          <img
            src={singlemoviedata?.Poster}
            alt={singlemoviedata?.Title}
            className="w-full md:w-1/3 max-h-[500px] object-cover rounded-lg shadow-md"
          />

          <div className="flex-1 flex flex-col gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              {singlemoviedata?.Title}
            </h1>

            <div className="text-sm sm:text-base text-gray-500">
              {singlemoviedata?.Year} • {singlemoviedata?.Runtime} •{" "}
              {singlemoviedata?.Genre}
            </div>

            <div className="flex items-center gap-2">
              <span className="text-yellow-500 text-xl">★</span>
              <span className="text-gray-700 font-semibold">
                {singlemoviedata?.imdbRating} / 10
              </span>
              <span className="text-sm text-gray-500">
                ({singlemoviedata?.imdbVotes} votes)
              </span>
            </div>

            <p className="text-gray-700 text-sm sm:text-base">
              {singlemoviedata?.Plot}
            </p>

            <div className="text-sm text-gray-600 space-y-1">
              <p>
                <span className="font-medium text-gray-800">Actors:</span>{" "}
                {singlemoviedata?.Actors}
              </p>
              <p>
                <span className="font-medium text-gray-800">Language:</span>{" "}
                {singlemoviedata?.Language}
              </p>
              <p>
                <span className="font-medium text-gray-800">Country:</span>{" "}
                {singlemoviedata?.Country}
              </p>
              <p>
                <span className="font-medium text-gray-800">Type:</span>{" "}
                {singlemoviedata?.Type}
              </p>
            </div>

            <div className="mt-4 flex items-center gap-10">
              <a
                href={`https://www.imdb.com/title/${singlemoviedata?.imdbID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-4 py-2 text-sm sm:text-base text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow transition"
              >
                View on IMDb
              </a>

              <CiHeart
                size={30}
                className={`transition cursor-pointer ${
                  favoritelists.includes(singlemoviedata.imdbID) &&
                  "bg-red-500 p-1 rounded-full text-white cursor-pointer"
                }`}
                onClick={() => setfavorite(singlemoviedata.imdbID)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
