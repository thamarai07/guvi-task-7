import { useEffect } from "react";
import { useReducer } from "react";
import { initialState, MovieReducer } from "../Hooks/MovieReducer";
export const FetchData = () => {
  const [state, dispatch] = useReducer(MovieReducer, initialState);

  useEffect(() => {
    try {
      dispatch({ type: "CHECK_LOAD", payload: true });
      const fetchFun = async () => {
        const res = await fetch(
          `https://www.omdbapi.com/?apikey=d565136f&i=tt1285016&s=${state.para}`
        );
        const data = await res.json();

        dispatch({ type: "CHECK_LOAD", payload: false });
        dispatch({ type: "SET_DATA", payload: data });
      };
      fetchFun();
    } catch {}
  }, [state.para]);

  const setpara = (data) => {
    dispatch({ type: "SET_PARA", payload: data });
  };

  const setfavorite = (data) => {
    if (state.favoritelist.includes(data) === false) {
      dispatch({ type: "FAVORITE_LIST", payload: data });
      dispatch({ type: "FAVORITE", payload: true });
    } else {
      let index = state.favoritelist.indexOf(data);
      if (index > -1) {
        console.log(state.favoritelist.splice(index, 0));
        state.favoritelist.splice(index, 1);
        dispatch({ type: "FAVORITE", payload: false });
      }
    }
  };
  return {
    setpara,
    data: state.data,
    loading: state.loading,
    favorite: state.favorite,
    setfavorite,
    favoritelists: state.favoritelist,
  };
};
