import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthContext } from "./hooks/useAuthContext";

import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookingRequests from "./pages/BookingRequests";
import OwnerRequests from "./pages/OwnerRequests";
import Listing from "./pages/Listing";
// imports the WalkerProfile page
import WalkerProfile from "./pages/WalkerProfile";
import OwnerProfile from "./pages/OwnerProfile";
import BookWalker from "./pages/BookWalker";
// import homepage
import Home from "./pages/Home";
// import Walk interval page
import WalkInterval from "./pages/WalkInterval";
//import walker walk page
import Walk from "./pages/WalkPage";
import EditWalker from "./pages/EditWalkerProfile";


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
            <Route path="/WalkerProfile/:username" element={<WalkerProfile />} />
            <Route path="/WalkerProfile/:username/edit" element={user?(<EditWalker/>):(<Navigate to="/" />)} />
            <Route path="/OwnerProfile/:username" element={<OwnerProfile />} />
            <Route path="/list" element={<Listing />} />
            <Route path="/walk/:id" element={user?(<Walk />):(<Navigate to="/" />)} />
            <Route path="/WalkerProfile/:username/book" element={user?(<BookWalker />):(<Navigate to="/" />)} />
            <Route path="/WalkerProfile/:username/requests" element={user?(<BookingRequests />):(<Navigate to="/" />)} />
            <Route path="/OwnerProfile/:username/requests" element={user?(<OwnerRequests />):(<Navigate to="/" />)} />
            <Route path="/login" element={!user?(<Login />):(<Navigate to="/" />)}/>
            <Route path="/signup" element={!user?(<Signup />):(<Navigate to="/" />)}/>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
