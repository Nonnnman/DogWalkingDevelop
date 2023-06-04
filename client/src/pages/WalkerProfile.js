import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import Calendar from "../components/Calendar";
import CreateSegment from "../components/CreateSegment";
import "../styles/profiles.css";
import profilePic from "../media/grinning.png";
import pricePic from "../media/price-tag.png";
import bioPic from "../media/profile.png";
import calPic from "../media/calendar.png";
import starPic from "../media/star.png";


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
		<div className="pageContainer">
			<div className="profileContainer">
				<img src={profilePic} alt="Profile picture" className="profilePic"/>
				<h2>{username}</h2>
				<p className="rating">Rating: {userObject.rating ? userObject.rating : "No ratings yet"}</p>
				<div className="profileInfo">
					<div className="infoItem">
						<img src={pricePic} alt="Price icon" className="infoIcon"/>
						<p>Price per walk: {userObject.price ? userObject.price : "No Price yet"}</p>
					</div>
					<div className="infoItem">
						<img src={bioPic} alt="Bio icon" className="infoIcon"/>
						<p>Bio: {userObject.bio ? userObject.bio : "No bio yet"}</p>
					</div>
				</div>
			</div>

			{isSameUser && (
				<>
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
			 </>
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
			<div className="calContainer">
				<img src={calPic} alt="Calendar icon" className="calendarIcon"/>
				<h3>{username}'s Schedule</h3>
				<Calendar username={username} />
			</div>
			 {isSameUser && <CreateSegment />}
		 </div>
		 <div className="ratingsContainer">
			 <h3>Ratings</h3>
			 {ratings.map((rating) => (
				 <div className="ratingBox" key={rating._id}>
					 <div>
						<p>{rating.rating}</p>
						<img src={starPic} alt="Star icon" className="logo"/>
					 </div>
					 <p>{rating.comment}</p>
					 <h4>- {rating.owner}</h4>
				 </div>
			 ))}
		 </div>
    </div>
  ); 
}

export default WalkerProfile;
