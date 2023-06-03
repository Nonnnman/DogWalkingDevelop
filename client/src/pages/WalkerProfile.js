import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Calendar from "../components/Calendar";
import CreateSegment from "../components/CreateSegment";


function WalkerProfile() {
  const { username: usernameParam } = useParams();
  const [username, setUser] = useState(null);
  const [userObject, setUserObject] = useState(null);
  const [onGoingbookings, setBookings] = useState([]);
  const [ratings, setRatings] = useState([]);
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
          setUserObject(data);
        }
      });
  }, [usernameParam, navigate]);

  useEffect(() => {
    async function fetchRatings() {
      const response = await fetch(`/api/ratings/${username}`);
      if (response.ok) {
        const data = await response.json();
        setRatings(data);
      }

    }
    fetchRatings();
  }, [username]);

  const notWalker = user.userType !== "walker";

  const isSameUser = username === user.username;


  if (!user || !username) {
    return <div className="Loading">
        loading...
    </div>;
  }


  return (
    <div>
      <div className="profileContainer">
      <h2>{username}</h2>
        <div className="profileInfo">
          <p>Rating: {userObject.rating? userObject.rating : "No ratings yet"}</p>
          <p>Price per walk: {userObject.price? userObject.price : "No Price yet"}</p>
          <p>Bio: {userObject.bio ? userObject.bio : "No bio yet"}</p>
        </div>
      </div>

      {isSameUser && (
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
      {notWalker && !isSameUser && (
        <button
          onClick={() => {
            navigate(`/WalkerProfile/${username}/book`);
          }}
        >
          Book
        </button>
      )}
      <div className="temporal">
        <Calendar username={username} />
        {isSameUser &&(
        <CreateSegment />
        )
        }
      </div>
      <div className="ratingsContainer">
        <h3>Ratings</h3>
        {ratings.map((rating) => (
          <div className="ratingBox" key={rating._id}>
            <p>From: {rating.owner}</p>
            <p>Rating: {rating.rating} / 5</p>
            <p>Comment: {rating.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WalkerProfile;
