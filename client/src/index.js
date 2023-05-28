import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ListingsContextProvider } from "./context/ListingsContext";
import { BookingsContextProvider } from "./context/BookingsContext";
import { SegmentsContextProvider } from "./context/SegmentsContext";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AuthContextProvider>
    <ListingsContextProvider>
      <SegmentsContextProvider>
        <BookingsContextProvider>
          <App />
        </BookingsContextProvider>
      </SegmentsContextProvider>
    </ListingsContextProvider>
  </AuthContextProvider>
);
