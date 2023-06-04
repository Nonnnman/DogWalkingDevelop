import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import {  useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/ownerRequests.css";

const BookingRequests = () => {
    const {username: usernameParam} = useParams();

    const [bookings, setBookings] = useState([]);
    const [segments, setSegments] = useState([]);
    const [username, setUser] = useState(null);

    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };

  
    const { user } = useAuthContext();
    const navigate = useNavigate();
  
    useEffect(() => {
      fetch(`${window.backend}/api/user/owner/${usernameParam}`)
        .then((response) =>{
          if (response.ok){
              return response.json();
          } 
          else {       
                navigate("/");
          }
        }) 
        .then((data) => {
              if (data){
                  setUser(data.username);
              }
        });
    }, [usernameParam, navigate]);
  
    if ( user.userType !== "owner"){
      //TODO: change to page 404
      console.log("not an owner");
      navigate("/");
    }
  
    const isSameUser = username === user.username;
  
    if(!isSameUser){
      navigate("/");
    }

    useEffect(() => {
        fetch(`${window.backend}/api/segments/all`)
          .then((response) => response.json())
          .then((data) => setSegments(data));
      }, []);
  
  
    useEffect(() => {
      async function fetchData() {
        const response = await fetch(`${window.backend}/api/bookings/owner/${username}`);
        const data = await response.json();
        setBookings(data.filter((booking) => booking.status !== "declined"));
      }
      fetchData();
    }, [username]);
  
  
    return (
      <div className="pageContainer">
        <h2>Booking Requests for {username}</h2>
        <div className="bookingList">
            {bookings.map((booking) => (
                // booking item
                <div className="bookingItem" key={booking._id}>
                <h3>Booking</h3>
                {segments.map((segment) => {
                if (segment._id === booking.seg_id) {
                  return (
                    <>
                      <p>Start {new Date(segment.start).toLocaleString('en-US', options)}</p>
                      <p>End {new Date(segment.end).toLocaleString('en-US', options)}</p>
                    </>
                  );
                }
                })}
                <p>Walker : {booking.walker}</p>
                <p>Status : {booking.status}</p>  
            </div>
  
        ))}
        </div>
      </div>
    );
  };

export default BookingRequests;
