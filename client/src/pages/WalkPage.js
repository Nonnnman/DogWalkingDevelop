import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import "../styles/walk.css";
import walking from "../media/dog-walking.png";

const WalkPage = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [segment, setSegment] = useState(null);
  //get user from context
  const { user } = useAuthContext();
  const Navigate = useNavigate();

  const [rating, setRating] = useState(1);
  
  const [ratings, setRatings] = useState([]);

  const [comment, setComment] = useState("");

  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };


  if (!user) {
    Navigate("/");
  }

  const isOwner = user.userType === "owner";

  //calculates new average rating after adding the new rating
  const avgRating = () => {

    let sum = rating;

    for (let i = 0; i < ratings.length; i++) {
      sum += ratings[i].rating;
    }

    console.log("new rating "+rating)
    console.log("sum "+sum)
    console.log("old length "+ratings.length)

    //new rating
    console.log("new "+sum / (ratings.length+1))

    return sum / (ratings.length+1);

  };
  

  //fetch ratings of walker
  const fetchRatings = async () => {
    const response = await fetch(`${window.backend}/api/ratings/${booking.walker}`);
    if (response.ok) {
      console.log("we got there")
      const data = await response.json();
      setRatings(data);
    }
  };

  
  const fetchBooking = async () => {
    const response = await fetch(`${window.backend}/api/bookings/id/${id}`);
    const data = await response.json();
    setBooking(data);
  };

  

  const fetchSegment = async () => {
    const response = await fetch(`${window.backend}/api/segments/${booking.seg_id}`);
    const data = await response.json();
    setSegment(data);

    if (booking.owner !== user.username && booking.walker !== user.username) {
      Navigate("/");
    }

  };

  useEffect(() => {
    fetchBooking();
  }, []);

  useEffect(() => {
    if (booking) {
      fetchSegment();
      fetchRatings();
    }
  }, [booking]);



  const handleEndWalk = async () => {
    const response = await fetch(`${window.backend}/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "expired" }),
    });

    if (response.ok) {
      setBooking({ ...booking, status: "expired" });
    }
  };

  const handleSubmitRating = async (e) => {

    e.preventDefault();
    
    const response = await fetch(`${window.backend}/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rated" }),
    });
  
    if (response.ok) {
      const postRatingResponse = await fetch(`${window.backend}/api/ratings/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          owner: booking.owner,
          walker: booking.walker,
          rating: rating,
          comment: comment,
        }),
      });

      if (postRatingResponse.ok) {
        
        await fetch(`${window.backend}/api/user/${booking.walker}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rating : avgRating() }),
        }).then((response) => {
          if (response.ok) {

            alert("Thank you for rating your experience!");
            Navigate("/");

          }
        }
        );

      }
    }
  };

  if (!booking || !segment) {
    return <div>Loading...</div>;
  }



  return (
    <div className="pageContainer">
      <div className="header">
        <img src={walking} alt="Beans logo" />
      </div>
      <div className="walkContainer">
        <h2>Walk Details</h2>
        <div className="walkInfo">
          <div className="infoItem">
            <p>Owner: {booking.owner}</p>
          </div>
          <div className="infoItem">
            <p>Walker: {booking.walker}</p>
          </div>
          <div className="infoItem">
            <p>Status: {booking.status}</p>
          </div>
          <div className="infoItem">
            <p>Start date: {new Date(segment.start).toLocaleString('en-US', options)}</p>
          </div>
          <div className="infoItem">
            <p>End date: {new Date(segment.end).toLocaleString('en-US', options)}</p>
          </div>
          <div className="infoItem">
            <p>Location: {booking.address}</p>
          </div>
        </div>

        {booking.status === "ongoing" ? (
          <>
            <p>Walk ongoing</p>
          </>
        ) : (
          <p>Walk expired</p>
        )}

        {!isOwner && booking.status === "ongoing" && (
          <button onClick={handleEndWalk} className="endButton">End walk</button>
        )}

        {isOwner && booking.status === "expired" && (
          <div className="ratingContainer">
            <h2>Rate your experience</h2>
            <form onSubmit={handleSubmitRating}>
              <div className="rating">
              Rating:
                <label>1 </label>

                  <input
                    type="radio"
                    name="rating"
                    value="1"
                    checked={rating === 1}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  <label>2 </label>
                  <input
                    type="radio"
                    name="rating"
                    value="2"
                    checked={rating === 2}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  <label>3 </label>
                  <input
                    type="radio"
                    name="rating"
                    value="3"
                    checked={rating === 3}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  <label>4 </label>
                  <input
                    type="radio"
                    name="rating"
                    value="4"
                    checked={rating === 4}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  <label>5 </label>
                  <input
                    type="radio"
                    name="rating"
                    value="5"
                    checked={rating === 5}
                    onChange={(e) => setRating(parseInt(e.target.value))}
                  />
                  
                
              </div>
              <br />
              <label>
                  Comment:
                  <textarea
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                </label>
              <br />
              <button type="submit" className="submitButton">Submit</button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default WalkPage;