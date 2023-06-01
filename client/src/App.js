import "./App.css";
import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookingRequests from "./pages/BookingRequests";
import Listing from "./pages/Listing";
import Profile from "./pages/Profile";
// imports the WalkerProfile page
import WalkerProfile from "./pages/WalkerProfile";
import BookWalker from "./pages/BookWalker";
// import homepage
import Home from "./pages/Home";

function App() {
  // get the user from the auth context. await for the user to be fetched
  const { user } = useAuthContext();


  //if user is not fetched, show loading
  if (!user) {
    return <div>Loading...</div>;
  }

  // if the user is fetched, show the website
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/WalkerProfile/:username" element={<WalkerProfile />} />
          </Routes>
          <Routes>
            <Route path="/list" element={<Listing />} />
            <Route
              path="/profile"
              element={<Profile />}
            />
            <Route
              path="/WalkerProfile/:username/book"
              element={<BookWalker />}
            />
            <Route
              path="/WalkerProfile/:username/requests"
              element={<BookingRequests />}
            />
            <Route
              path="/login"
              element={<Login />}
            />
            <Route
              path="/signup"
              element={<Signup />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
