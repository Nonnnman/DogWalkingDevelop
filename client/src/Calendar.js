import React, { Component } from 'react';
import FullCalendar from 'react-fullcalendar';

class Calendar extends Component {
  render() {
    return (
      <div className="wrapper">
        <FullCalendar
          initialView="dayGridMonth"
        />
      </div>
    );
  }
}

export default Calendar;