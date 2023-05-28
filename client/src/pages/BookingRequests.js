import { useEffect } from "react";
import { useBookingsContext } from "../hooks/useBookingsContext";
import { useAuthContext } from "../hooks/useAuthContext";

const BookingRequests = () => {
  const { bookings, dispatch } = useBookingsContext();
  const { user } = useAuthContext();

  useEffect(() => {
    const fetchBookings = async () => {
      const response = await fetch("/api/bookings", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      const json = await response.json();

      if (response.ok) {
        dispatch({ type: "SET_LISTING", payload: json });
      }
    };

    if (user) {
      fetchBookings();
    }
  }, [dispatch, user]);

  return (
    <div>
      <div>
        {bookings &&
          bookings.map((item) => <h4 key={item._id}>{item.owner}</h4>)}
      </div>
    </div>
  );
};

export default BookingRequests;
