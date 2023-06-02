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
// import Walk interval page
import WalkInterval from "./pages/WalkInterval";


function App() {
  // get the user from the auth context. await for the user to be fetched
  const { user } = useAuthContext();

  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {

      setIsLoading(false);
    
  }, [user]);

  //if user is not fetched, show loading
  if (isLoading) {
    return <div>Loading...</div>;
  }


  // if the user is fetched, show the website
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <WalkInterval />
        <div className="pages">
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path="/WalkerProfile/:username" element={user?(<WalkerProfile />):(<Navigate to="/" />)} />
            <Route path="/list" element={<Listing />} />
            <Route path="/profile" element={user?(<Profile />):(<Navigate to="/" />)}/>
            <Route path="/WalkerProfile/:username/book" element={user?(<BookWalker />):(<Navigate to="/" />)} />
            <Route path="/WalkerProfile/:username/requests" element={user?(<BookingRequests />):(<Navigate to="/" />)} />
            <Route path="/login" element={!user?(<Login />):(<Navigate to="/" />)}/>
            <Route path="/signup" element={!user?(<Signup />):(<Navigate to="/" />)}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
