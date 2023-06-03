import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../hooks/useAuthContext";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar.css";
import { useState, useEffect } from "react";

const localizer = momentLocalizer(moment);


const Cal = (username) => {

  const [segments, setSegments] = useState([]);


  useEffect(() => {
    fetch(`/api/segments/fromUser/${username.username}`)
      .then((response) => response.json())
      .then((data) => setSegments(data));
  }, [username.username]);

  var events = [];

  if (segments) {
    events = segments.map((segment) => {
      return {
        title: "",
        start: new Date(segment.start),
        end: new Date(segment.end),
      };
    });
  }

  return (
      <div className="calendar_container">
        <h3>{username.username}'s Schedule</h3>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          //view="week"
          views={{
            week: true,
            day: true,
            month: true,
            agenda: true,
          }}
          style={{ width: 1400, height: 600 }}
          //components={{
          //  toolbar: () => null,
          //}}
        />
      </div>
  );
};

export default Cal;
