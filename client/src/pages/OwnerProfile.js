import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/ownerProfile.css";
import ownerPic from "../media/naughty.png";

function OwnerProfile() {
  const { username: usernameParam } = useParams();
  const [username, setUser] = useState(null);
  const [onGoingbookings, setBookings] = useState([]);
  const { user } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bookings/owner/${username}`);
      const data = await response.json();
      setBookings(data.filter((booking) => booking.status == "ongoing" || booking.status == "expired"));
    }
    fetchData();
  }, [username]);

  useEffect(() => {
    fetch(`/api/user/owner/${usernameParam}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          navigate("/");
        }
      })
      .then((data) => {
        if (data) {
          setUser(data.username);
        }
      });
  }, [usernameParam, navigate]);


  const notOwner = user && user.userType !== "owner";

  const isSameUser = user && username === user.username;

  if (!username) {
    return <div className="Loading">
        loading...
    </div>;
  }

  return (
    <div className="pageContainer">
      <div className="ownerProfileContainer">
      <img src={ownerPic} alt="Owner profile picture" className="ownerPicture"/>
        <h2>{username}</h2>

        {isSameUser && (
          <div>
            <div className="ongoingContainer">
              <h3>Ongoing Bookings</h3>
              {onGoingbookings.map((booking) => (
                <div className="ongoingBooking" key={booking._id}>
                  <p>{booking.owner}</p>
                  <p>{booking.status}</p>
                  <button
                    onClick={() => {
                      navigate(`/walk/${booking._id}`);
                    }}
                  >
                    Go to Walk page!
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default OwnerProfile;
