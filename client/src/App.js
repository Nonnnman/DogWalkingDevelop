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
// imports the UserProfile page
import UserProfile from "./pages/UserProfile";
import BookWalker from "./pages/BookWalker";

function App() {
  // get the user from the auth context. await for the user to be fetched
  const { user } = useAuthContext();

  // not sure what this does
  const [loading, setLoading] = useState(true);

  // if the user is fetched, show the website
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route path="/UserProfile/:username" element={<UserProfile />} />
          </Routes>
          <Routes>
            <Route path="/list" element={<Listing />} />
            <Route
              path="/profile"
              element={user ? <Profile /> : <Navigate to="/login" />}
            />
            <Route
              path="/UserProfile/:username/book"
              element={<BookWalker />}
            />
            <Route
              path="/UserProfile/:username/requests"
              element={<BookingRequests />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
