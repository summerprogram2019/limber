import React, { useState } from 'react';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";

import NavBar from './components/NavBar';
import translations from './translations.json';
import './App.css';

import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: translations,
    lng: "en",
    fallbackLng: "en",

    interpolation: {
      escapeValue: false
    }
  });

const App: React.FC = () => {
  const { t } = useTranslation();
  const [english, setEnglish] = useState<boolean>(true);
  const [calendarWeekends, setCalendarWeekends] = useState<boolean>(true);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([
    {
      title: "Event Now",
      start: new Date()
    }
  ]);

  const calendarComponentRef = React.useRef<FullCalendar>(null);

  function toggleWeekends() {
    setCalendarWeekends(calendarWeekends => !calendarWeekends);
  }

  function gotoPast() {
    let calendarApi = calendarComponentRef.current!.getApi()
    calendarApi.gotoDate('2000-01-01') // call a method on the Calendar object
  }

  function handleToggle() {
    i18n.changeLanguage(!english ? "en-US" : "zh-CN")
    setEnglish(prev => !prev);
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
    <div className="App">
      <header>
        <NavBar/>
      </header>
      <p>{t("Welcome to React")}</p>
      <button onClick={handleToggle}>toggle</button>
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
    </div>
  );
}

export default App;