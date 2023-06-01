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

  if(!username || username !== user.username){
    navigate("/");
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
      <div className="segmentList">
          {segments.map((segment) => (
          
          // segment item
          <div className="segmentItem" key={segment._id}>
            <p>{new Date(segment.start).toLocaleDateString()} -{" "}
            {new Date(segment.end).toLocaleDateString()}</p>

            <div className="bookingList">
              {bookings.filter((booking) => booking.seg_id === segment._id).map((booking) => (

                // booking item
                <div className="bookingItem" key={booking._id}>
                  <p>{booking.owner}</p>
                  <p>{booking.status}</p>
                </div>

                  ))}
            </div>

          </div>
          ))}
      </div>
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
