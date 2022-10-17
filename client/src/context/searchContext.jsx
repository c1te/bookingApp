import { createContext, useReducer } from "react";
const currDate = new Date();
const INITIAL_STATE = {
  destination: "",
  dates: [
    {
      endDate: new Date(currDate.getDate() + 1),
      startDate: new Date(currDate.getDate()),
    },
  ],
  options: {
    adult: undefined,
    children: undefined,
    room: undefined,
  },
};

export const SearchContext = createContext(INITIAL_STATE);

const SearchReducer = (state, action) => {
  switch (action.type) {
    case "NEW_SEARCH":
      return action.payload;
    case "RESET_SEARCH":
      return INITIAL_STATE;
    default:
      return state;
  }
};

export const SearchContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(SearchReducer, INITIAL_STATE);

  return (
    <SearchContext.Provider
      value={{
        destination: state.destination,
        dates: state.dates,
        options: state.options,
        bookedRooms: state.bookedRooms,
        dispatch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
