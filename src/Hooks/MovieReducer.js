export const initialState = {
  data: [],
  para: "tamil",
  loading: false,
  singlemovieid: "",
  singlemoviedata: "",
  singlemoviedataloading: false,
  favorite: false,
  favoritelist: [],
};

export const MovieReducer = (state, action) => {
  switch (action.type) {
    case "SET_DATA":
      return {
        ...state,
        data: action.payload,
      };
    case "SET_PARA":
      return {
        ...state,
        para: action.payload,
      };
    case "CHECK_LOAD":
      return {
        ...state,
        loading: action.payload,
      };
    case "SINGLE_MOVIE_ID":
      return {
        ...state,
        singlemovieid: action.payload,
      };
    case "SINGLE_MOVIE":
      return {
        ...state,
        singlemoviedata: action.payload,
      };
    case "SINGLE_MOVIE_LOADING":
      return {
        ...state,
        singlemoviedataloading: action.payload,
      };
    case "FAVORITE":
      return {
        ...state,
        favorite: action.payload,
      };
    case "FAVORITE_LIST":
      return {
        ...state,
        favoritelist: [...state.favoritelist, action.payload],
      };
    default:
      return state;
  }
};
