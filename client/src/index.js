import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { ListingsContextProvider } from "./context/ListingsContext";
import { BookingsContextProvider } from "./context/BookingsContext";
import { SegmentsContextProvider } from "./context/SegmentsContext";
import "./styles/index.css";

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
