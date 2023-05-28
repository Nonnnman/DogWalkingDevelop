import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar.css"

const localizer = momentLocalizer(moment)

const events = [
  {
    title: "",
    start: new Date(2023, 5, 1, 22, 0, 0),
    end: new Date(2023, 5, 1, 23, 0, 0)
  }
]

const calendar = (props) => (
  
  <div className='calendar_container'>
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      view="week"
      views={{
        week: true,
      }}
      style={{ width: 1400, height: 600}}
      components={{
        toolbar: () => null,
      }}
    />
  </div>
)

export default calendar