import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

function WalkerProfile() {

  const {username: usernameParam} = useParams();
  const [username, setUser] = useState(null);
  const [onGoingbookings, setBookings] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bookings/${username}`);
      const data = await response.json();
      setBookings(data.filter((booking) => booking.status == "ongoing"));
    }
    fetchData();
  }, [username]);

 useEffect(() => {
  fetch(`/api/user/${usernameParam}`)
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

const notWalker = user.userType !== "walker";

const isSameUser = username === user.username;

  if (!user) {
    return <div></div>;
  }

  return (
    <div>
      
      <h2>{isSameUser? `Welcome ${username}` : `Welcome to ${username}'s profile`}</h2>

      
      { isSameUser && ( 
        <div>
          <button
          onClick={() => {
            navigate(`/WalkerProfile/${username}/edit`);
          }}
          >
          Edit Profile
          </button>
          <div className="ongoingContainer">

            <h3>Ongoing Bookings</h3>
            {onGoingbookings.map((booking) => (
              <div className="ongoingBooking" key={booking._id}>
                <p>{booking.owner}</p>
                <p>{booking.status}</p>
                <button
                onClick={() => {
                  navigate(`/WalkerProfile/${username}/walk/${booking._id}`);
                }}
                >
                Go to Walk page!
                </button>
              </div>
              ))}

          </div>
        </div>
        )
      }
      {notWalker && !isSameUser && (
        <button
        onClick={() => {
            navigate(`/WalkerProfile/${username}/book`);
        }}
        >
        Book
        </button>
        )
      }
    </div>
  );
}

export default WalkerProfile;