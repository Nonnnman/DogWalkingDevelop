import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { Calendar, momentLocalizer } from 'react-big-calendar'
import moment from 'moment'
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../calendar.css"

import { useSegmentsContext } from "../hooks/useSegmentsContext"
import { useEffect }from 'react'

const localizer = momentLocalizer(moment)



const Cal = (username) => {

  console.log(username.username)

  const {segments, dispatch} = useSegmentsContext()

  useEffect(() => {
    const fetchSegments = async () => {
      const response = await fetch('/api/segments/fromUser/'+username.username, {
        headers: {
        }
      })
      
      const json = await response.json()

      if (response.ok) {

        dispatch({type: 'SET_LISTING', payload: json})
      }

    }
    fetchSegments()
  }, [dispatch])



  var events = []

  if(segments){
    events = segments.map((segment) => {
      return {
        title: "",
        start: new Date(segment.start),
        end: new Date(segment.end)
      };
    });
  }


  const navigate = useNavigate();
  const { user } = useAuthContext()


  return (
    <div>
      <div>
        <h1>{user.username}'s Profile</h1>
          <button onClick={ () => {
            navigate("/requests");
          } }>Requests</button>
      </div>
      <div className='calendar_container'>
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
          style={{ width: 1400, height: 600}}
          //components={{
          //  toolbar: () => null,
          //}}
        />
      </div>
        <div>
          This is where we at
          <div>
            {segments && segments.map((item) => (
              <h4 key={item._id}>{item.user}</h4>
            ))}
          </div>
        </div>
    </div>
  )
}

export default Cal