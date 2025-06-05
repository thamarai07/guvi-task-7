import React, { useState } from "react";
import { usePagination } from "../functions/pagination";
import { useMovie } from "../Hooks/MovieContext";
import { Link, Outlet } from "react-router-dom";
import { CiHeart } from "react-icons/ci";

export default function MovieDetails() {
  const { data, loading, favorite, setfavorite, favoritelists } = useMovie();
  const [errorImages, setErrorImages] = useState({});

  const itemsPerPage = 6;
  const {
    currentPage,
    setCurrentPage,
    totalPages,
    indexOfFirstItem,
    indexOfLastItem,
  } = usePagination(data?.Search?.length || 0, itemsPerPage);

  const currentItems = data?.Search?.slice(indexOfFirstItem, indexOfLastItem);

  const handleImageError = (title) => {
    setErrorImages((prev) => ({ ...prev, [title]: true }));
  };

  if (loading) {
    return (
      <p className="text-center text-xl sm:text-2xl font-semibold pt-10 animate-pulse text-indigo-500">
        Loading...
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-col items-center gap-6 p-4 sm:p-6 md:p-8">
        {/* Movie Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-7xl">
          {currentItems !== undefined ? (
            currentItems.map((movie, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 shadow-lg flex flex-col justify-between bg-white"
              >
                {!errorImages[movie.Title] ? (
                  <img
                    src={movie.Poster}
                    alt={movie.Title}
                    onError={() => handleImageError(movie.Title)}
                    className="w-full h-64 object-cover mb-4 rounded"
                  />
                ) : (
                  <div className="w-full h-64 bg-gray-200 flex items-center justify-center text-sm text-gray-500 rounded mb-4">
                    Image not available
                  </div>
                )}
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  {movie.Title}
                </h2>
                <div className="flex justify-between items-center">
                  <Link
                    className="bg-indigo-600 text-white py-1 px-4 text-sm rounded hover:bg-indigo-700 transition"
                    to={`/movie_details/${movie.imdbID}`}
                  >
                    Know More
                  </Link>
                  <CiHeart
                    size={28}
                    className={`cursor-pointer transition ${
                      favoritelists.includes(movie.imdbID)
                        ? "text-white bg-red-500 p-1 rounded-full"
                        : "text-gray-600"
                    }`}
                    onClick={() => setfavorite(movie.imdbID)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="col-span-full text-center text-gray-600">
              Movies not found
            </p>
          )}
        </div>

        {totalPages > 1 && (
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 border rounded text-sm font-medium ${
                  page === currentPage
                    ? "bg-blue-600 text-white"
                    : "bg-white hover:bg-blue-100"
                } transition`}
              >
                {page}
              </button>
            ))}
          </div>
        )}
      </div>
      <Outlet />
    </>
  );
}
