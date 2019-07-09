import React, { useState } from 'react';
import { useTranslation } from "react-i18next";

import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

const Home: React.FC = () => {
  const { t } = useTranslation();
  const calendarComponentRef = React.useRef<FullCalendar>(null);
  const [calendarWeekends, setCalendarWeekends] = useState<boolean>(true);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([
    {
      title: "Event Now",
      start: new Date()
    }
  ]);
  
  function toggleWeekends() {
    setCalendarWeekends(calendarWeekends => !calendarWeekends);
  }

  function gotoPast() {
    let calendarApi = calendarComponentRef.current!.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  function handleDateClick(arg: any) {
    if (window.confirm('Would you like to add an event to ' + arg.dateStr + ' ?')) {
      setCalendarEvents((calendarEvents: EventInput[]) => {
        return calendarEvents.concat({
          title: 'New Event',
          start: arg.date,
          allDay: arg.allDay
        })
      })
    }
  }
  
  return (
    <React.Fragment>
      <div className='demo-app'>
        <div className='demo-app-top'>
          <button onClick={ toggleWeekends }>toggle weekends</button>&nbsp;
          <button onClick={ gotoPast }>go to a date in the past</button>&nbsp;
          (also, click a date/time to add an event)
        </div>
        <div className='demo-app-calendar'>
          <FullCalendar
            defaultView="dayGridMonth"
            header={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
            }}
            plugins={[ dayGridPlugin, timeGridPlugin, interactionPlugin ]}
            ref={ calendarComponentRef }
            weekends={ calendarWeekends }
            events={ calendarEvents }
            dateClick={ handleDateClick }
            />
        </div>
      </div>
    </React.Fragment>
  )
}

export default Home;