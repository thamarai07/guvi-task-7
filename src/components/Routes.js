import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import MovieDetails from "../pages/MovieDetails";
import SingleMovie from "../pages/SingleMovie";
export default function MainRouter() {
  return (
    <div className="max-w-[998px] m-auto">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie_details" element={<MovieDetails />} />
        <Route path="/movie_details/:id" element={<SingleMovie />} />
      </Routes>
    </div>
  );
}
