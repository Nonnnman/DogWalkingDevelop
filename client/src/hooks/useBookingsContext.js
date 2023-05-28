import { BookingsContext } from "../context/BookingsContext";
import { useContext } from "react";

export const useBookingsContext = () => {
  const context = useContext(BookingsContext);

  if (!context) {
    throw Error(
      "useBookingsContext must be used inside an BookingsContextProvider"
    );
  }

  return context;
};
