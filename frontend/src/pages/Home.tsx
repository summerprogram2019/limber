import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { useTranslation } from "react-i18next";
import { Paper, Container } from '@material-ui/core';
import FullCalendar from '@fullcalendar/react'
import { EventInput } from '@fullcalendar/core'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction' // needed for dayClick
import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';
import '@fullcalendar/timegrid/main.css';
import { Redirect } from 'react-router-dom';
import i18n from 'i18next';
import { RawLocale } from '@fullcalendar/core/datelib/locale';
const allLocales: RawLocale[] = require('@fullcalendar/core/locales-all');

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(2),
      minHeight: 200,
      height: "100%"
    },
    container: {
      padding: theme.spacing(2, 0)
    }
  }),
);

const Home: React.FC = () => {
  const { t } = useTranslation();
  const classes = useStyles();
  const calendarComponentRef = React.useRef<FullCalendar>(null);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [calendarWeekends, setCalendarWeekends] = useState<boolean>(true);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([
    {
      title: "Event Now",
      start: new Date(),
      id: 1
    }
  ]);

  useEffect(() => {
    i18n.on('languageChanged', changeCalendarLanguage);
    return () => {
      i18n.off('languageChanged', changeCalendarLanguage);
    }
  }, []);

  const changeCalendarLanguage = (lng: string) => {
    let calendarApi = calendarComponentRef.current!.getApi();
    calendarApi.setOption("locale", lng);
  }
  
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

  function handleEventClick(arg: any) {
    if (arg.event && arg.event.id) {
      setRedirect(arg.event.id);
    }
  }
  
  return (
    <React.Fragment>
      {redirect && <Redirect to={"/events/" + redirect} />}
      <Container fixed className={classes.container}>
        <Paper className={classes.paper}>
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
            eventClick={handleEventClick}
            locales={allLocales}
            locale={i18n.language}
            />
        </Paper>
      </Container>
    </React.Fragment>
  )
}

export default Home;