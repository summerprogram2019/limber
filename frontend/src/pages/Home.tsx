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
import moment from 'moment';
import { useAuth0 } from "../react-auth0-wrapper";
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
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>([]);
  const [redirect, setRedirect] = useState<string | null>(null);
  const [calendarWeekends, setCalendarWeekends] = useState<boolean>(true);
  const [calendarEvents, setCalendarEvents] = useState<EventInput[]>(events);
  const { isAuthenticated, getTokenSilently } = useAuth0();
  // const [calendarEvents, setCalendarEvents] = useState<EventInput[]>([
  //   {
  //     title: "Event Now",
  //     start: new Date(),
  //     id: 1
  //   }
  // ]);

  useEffect(() => {
    i18n.on('languageChanged', changeCalendarLanguage);
    return () => {
      i18n.off('languageChanged', changeCalendarLanguage);
    }
  }, []);

  useEffect(() => {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/event";
    let token: string;

    const fetchData = async () => {
      if (!isAuthenticated) return;
      try {
        token = await getTokenSilently();
      } catch (error) {
        return;
      }
      let response: Response = await fetch(apiHost + apiEndpoint, {
        method: "GET",
        headers: {
          Authorization: 'Bearer ' + token
        }
      })
      let json = await response.json();
      if (json.success) {
        setEvents(json.data);
        setCalendarEvents(json.data.filter((event: any) => event.participating).map((event: any) => {
          event.start = event.datetime;
          event.end = moment(event.datetime).utc().add(event.length, 'm').format();
          event.title = event.name;
          return event;
        }));
        setLoading(false);
      }
    };

    fetchData();
  }, [isAuthenticated, getTokenSilently]);

  const changeCalendarLanguage = (lng: string) => {
    let calendarApi = calendarComponentRef.current!.getApi();
    calendarApi.setOption("locale", lng);
  }

  function handleDateClick(arg: any) {
    let calendarApi = calendarComponentRef.current!.getApi()
    if (arg.allDay) {
      calendarApi.changeView('timeGridDay', arg.date);
    } else {
      let split = arg.dateStr.split("T");
      let date, time;
      date = split[0];
      if (split.length > 1) {
        let _time = split[1].split("+")[0];
        let _split = _time.split(":");
        if (_split.length >= 2) {
          time = _split[0] + ":" + _split[1];
        }
      }
      setRedirect("/events?dur=120&date=" + date + (time ? "&time=" + time : ""));
    }
  }

  function handleEventClick(arg: any) {
    if (arg.event && arg.event.id) {
      setRedirect("/events/" + arg.event.id);
    }
  }
  
  return (
    <React.Fragment>
      {redirect && <Redirect to={redirect} />}
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