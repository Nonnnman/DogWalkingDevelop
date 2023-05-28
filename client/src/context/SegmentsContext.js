import { createContext, useReducer } from "react";

export const SegmentsContext = createContext();

export const segmentsReducer = (state, action) => {
  switch (action.type) {
    case "SET_LISTING":
      return {
        segments: action.payload,
      };
    case "CREATE_LISTING":
      return {
        segments: [action.payload, ...state.segments],
      };
    case "DELETE_LISTING":
      return {
        segments: state.segments.filter((w) => w._id !== action.payload._id),
      };
    default:
      return state;
  }
};

export const SegmentsContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(segmentsReducer, {
    segments: null,
  });

  return (
    <SegmentsContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SegmentsContext.Provider>
  );
};
