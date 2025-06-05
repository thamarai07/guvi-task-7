import { useEffect, useReducer } from "react";
import { initialState, MovieReducer } from "../Hooks/MovieReducer";

export const FetchSingleMovie = (id) => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        dispatch({ type: "SINGLE_MOVIE_LOADING", payload: true });

        const data = await fetch(
          `https://www.omdbapi.com/?apikey=d565136f&i=${id}`
        );
        const res = await data.json();
        dispatch({ type: "SINGLE_MOVIE", payload: res });
        dispatch({ type: "SINGLE_MOVIE_LOADING", payload: false });
      } catch (error) {
        console.log(error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  return {
    singlemoviedata: state.singlemoviedata,
    singlemoviedataloading: state.singlemoviedataloading,
  };
};
