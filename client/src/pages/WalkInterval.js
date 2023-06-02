import React, { useState, useEffect } from "react";

const WalkInterval = () => {
  const [bookings, setBookings] = useState([]);
  const [segments, setSegments] = useState([]);

  const changeBookingOngoing = (booking_id) => {

    console.log("The walk is ongoing");

    fetch(`/api/bookings/${booking_id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: "ongoing",
      }),
    })
      .then((response) => {
        
        //filterBookings();
        return response.json()})
        .then((data) => console.log(data))
        .catch((error) => console.error(error));
    }

  const fetchBookings = async () => {
    const response = await fetch("/api/bookings/all");
    const data = await response.json();
    setBookings(data.filter((booking) => booking.status === "accepted"));
  };

  const fetchSegments = async () => {
    const response = await fetch("/api/segments/all");
    const data = await response.json();
    setSegments(data);
  };

  useEffect(() => {
    fetchBookings();
    fetchSegments();
  }, []);

  const checkOngoingWalks = () => {
    const now = new Date().getTime();

    for (const booking of bookings) {
        if(booking){

      const segment = segments.find((s) => s._id === booking.seg_id);
    
        console.log("for booking: "+booking._id)
        console.log("segment: "+segment);

      if (segment) {
        const start = Date.parse(segment.start);
        const end = Date.parse(segment.end);

        if (now >= start && now <= end) {
            changeBookingOngoing(booking._id);
        } else {
          //console.log("The walk is not ongoing");
        }
      }
    }
    }

  };

  useEffect(() => {
    setInterval(checkOngoingWalks, 60000);
  }, [bookings, segments]);

  return <></>;
};

export default WalkInterval;