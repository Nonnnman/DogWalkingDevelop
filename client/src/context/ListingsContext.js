import { createContext, useReducer } from "react";

export const ListingsContext = createContext();

export const listingsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTING":
      return {
        listings: action.payload,
      };
    case "CREATE_LISTING":
      return {
        listings: [action.payload, ...state.listings],
      };
    case "DELETE_LISTING":
      return {
        listings: state.listings.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const ListingsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(listingsReducer, {
    listings: null,
  });

  return (
    <ListingsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ListingsContext.Provider>
  );
};
