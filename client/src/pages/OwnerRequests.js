import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { Navigate, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookingRequests = () => {
  const {username} = useParams();

  const [bookings, setBookings] = useState([]);
  const [segments, setSegments] = useState([]);

  const { user } = useAuthContext();
  const navigate = useNavigate();

  console.log("username", username);

  if(!user){
    navigate("/login");
  }

  if(!username || username !== user.username){
    navigate("/");
  }

  //decline booking
  const declineBooking = (booking_id, owner) => {
    //print "declined for "+owner
    alert("declined for "+owner);

    fetch(`/api/bookings/${booking_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "declined",
      }),
    })
      .then((response) => {
        //TODO: update the status in real time
        //TODO: send notifcation to owner
        return response.json()})
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }


  //accept booking
  const acceptBooking = (booking_id, owner) => {
    //print "accepted for "+owner
    alert("accepted for "+owner);

    fetch(`/api/bookings/${booking_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "accepted",
      }),
    })
      .then((response) => {
        //TODO: update the status in real time
        //TODO: send notifcation to owner
        return response.json()})
      .then((data) => console.log(data))
      .catch((error) => console.error(error));
  }


  useEffect(() => {
    fetch(`/api/segments/fromUser/${username}`)
      .then((response) => response.json())
      .then((data) => setSegments(data));
  }, [username]);

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(`/api/bookings/${username}`);
      const data = await response.json();
      setBookings(data);
    }
    fetchData();
  }, [username]);


  return (
    <div>
      <h2>Bookings</h2>
      <div>
      {bookings &&
          bookings.map((item) => <div key={item._id}>
            <h3>ITEM</h3>
            <p>{item.owner}</p>
            <p>{item._id}</p>
            </div>
            )}
      </div>
    </div>
  );
};

export default BookingRequests;
