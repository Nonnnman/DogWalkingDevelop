import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";

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
    const response = await fetch(`/api/ratings/${booking.walker}`);
    if (response.ok) {
      console.log("we got there")
      const data = await response.json();
      setRatings(data);
    }
  };

  
  const fetchBooking = async () => {
    const response = await fetch(`/api/bookings/id/${id}`);
    const data = await response.json();
    setBooking(data);
  };

  

  const fetchSegment = async () => {
    const response = await fetch(`/api/segments/${booking.seg_id}`);
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
    const response = await fetch(`/api/bookings/${id}`, {
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
    
    const response = await fetch(`/api/bookings/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: "rated" }),
    });
  
    if (response.ok) {
      const postRatingResponse = await fetch("/api/ratings/", {
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
        
        await fetch(`/api/user/${booking.walker}`, {
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
    <div>
      <h1>Walker Walk Page</h1>
      <p>Owner: {booking.owner}</p>
      <p>Walker: {booking.walker}</p>
      <p>Status: {booking.status}</p>
      <p>Start date: {segment.start}</p>
      <p>End date: {segment.end}</p>

      {booking.status === "ongoing" ? (
        <>
          <p>Walk ongoing</p>
        </>
      ) : (
        <p>Walk expired</p>
      )}

      {!isOwner && booking.status === "ongoing" && (
        <button onClick={handleEndWalk}>End walk</button>
      )}

      {isOwner && booking.status === "expired" && (
        <div>
          <h2>Rate your experience</h2>
          <form onSubmit={handleSubmitRating}>
            <div className="rating">
            Rating:
              <label>
                1
                <input
                  type="radio"
                  name="rating"
                  value="1"
                  checked={rating === 1}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                2
                <input
                  type="radio"
                  name="rating"
                  value="2"
                  checked={rating === 2}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                3
                <input
                  type="radio"
                  name="rating"
                  value="3"
                  checked={rating === 3}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                4
                <input
                  type="radio"
                  name="rating"
                  value="4"
                  checked={rating === 4}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                5
                <input
                  type="radio"
                  name="rating"
                  value="5"
                  checked={rating === 5}
                  onChange={(e) => setRating(parseInt(e.target.value))}
                />
                
              </label>
              <br />
              <label>
                Comment:
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
              </label>
            </div>
            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default WalkPage;