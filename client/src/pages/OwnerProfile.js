import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

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


  const notOwner = user.userType !== "owner";

  const isSameUser = username === user.username;

  if (!user || !username) {
    return <div className="Loading">
        loading...
    </div>;
  }

  return (
    <div>
      <h2>
        {isSameUser
          ? `Welcome ${username}`
          : `Welcome to ${username}'s profile`}
      </h2>

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
  );
}

export default OwnerProfile;
