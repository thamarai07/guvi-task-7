import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMovie } from "../Hooks/MovieContext";
import { CiHeart } from "react-icons/ci";

export default function Navbar() {
  const { setpara, favoritelists } = useMovie();
  const [Value, setValue] = useState("");
  const navigate = useNavigate(); 

  const handleClick = () => {
    if (Value?.trim()) {
      setpara(Value.trim());
      setValue("");
      navigate("/movie_details"); 
    }
  };

  return (
    <nav className="bg-white shadow-md py-4 px-4 sm:px-6 md:px-10">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left Links */}
        <div className="flex items-center gap-4 text-sm sm:text-base">
          <Link
            to="/"
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
          >
            Home
          </Link>
          <Link
            to="/movie_details"
            className="text-indigo-600 font-semibold hover:text-indigo-800 transition duration-300"
          >
            Movies
          </Link>
        </div>

        {/* Search and Favorite */}
        <div className="flex flex-col sm:flex-row items-center w-full md:w-auto gap-2">
          <input
            type="text"
            value={Value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleClick()}
            placeholder="Search movie..."
            className="w-full sm:w-64 px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
          />
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={handleClick}
              className="w-full sm:w-auto px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition"
            >
              Search
            </button>
            <div className="relative cursor-pointer">
              <CiHeart
                size={30}
                className={`transition ${
                  favoritelists.length > 0
                    ? "bg-red-500 p-1 rounded-full text-white"
                    : "text-indigo-600"
                }`}
              />
              {favoritelists.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-blue-500 w-5 h-5 text-center rounded-full text-white text-xs leading-5">
                  {favoritelists.length}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
