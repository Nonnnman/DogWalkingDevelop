import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const BookingRequests = () => {
  const {username: usernameParam} = useParams();

  const [bookings, setBookings] = useState([]);
  const [segments, setSegments] = useState([]);
  const [username, setUser] = useState(null);

  const { user } = useAuthContext();
  const navigate = useNavigate();

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

  if ( user.userType !== "walker"){
    //TODO: change to page 404
    console.log("not a walker");
    navigate("/");
  }

  if(!username ||  username !== user.username){
    navigate("/");
  }

  //filter out all bookings with status "declined"
  const filterBookings = () => {
    setBookings(bookings.filter((booking) => booking.status !== "declined"));
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
        
        //filterBookings();
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

        //filter out all other bookings for this segment
  
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

      //call the filter function
      //filterBookings();
    }
    fetchData();
  }, [username]);


  return (
    <div>
      <h1>Booking Requests for {username}</h1>
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
                  <button
                    onClick={() => {
                      acceptBooking(booking._id, booking.owner)
                      //decline every other booking with the same segment_id
                      //takes in a list of every other booking with the same segment_id
                      const otherBookings = bookings.filter(
                        (otherBooking) => otherBooking.seg_id === segment._id && otherBooking._id !== booking._id);
                        //decline every other booking
                        otherBookings.forEach((otherBooking) => {
                          declineBooking(otherBooking._id, otherBooking.owner);
                        });
                    }}
                  >Accept</button>
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
