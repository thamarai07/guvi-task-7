import { FetchData } from "../api/fetchdata";
import { createContext, useContext } from "react";

const MovieContext = createContext(null);

export const MovieContextProvider = ({ children }) => {
  const { setpara, data, loading, favorite, setfavorite, favoritelists } =
    FetchData();
  return (
    <MovieContext.Provider
      value={{
        setpara,
        data,
        loading,
        favorite,
        setfavorite,
        favoritelists
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovie = () => useContext(MovieContext);
