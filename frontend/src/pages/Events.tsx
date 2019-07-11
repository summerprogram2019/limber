import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Breadcrumbs } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-wrapper";

import Search from '../components/Search';
import Event from '../components/Event';

interface Event {
  id: number,
  name: string,
  group?: {
    id: number,
    name: string
  },
  description: string,
  tags: string[],
  image: string,
  matchingTags?: number
}

interface MatchingEvent extends Event {
  matchingTags: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(2),
      [theme.breakpoints.up('md')]: {
        display: "flex",
        flexDirection: "row"
      },
      [theme.breakpoints.down('sm')]: {
        display: "grid",
        gridTemplateColumns: "100fr",
        gridGap: theme.spacing(2)
      },
    },
    search: {
      minWidth: 300,
      [theme.breakpoints.up('md')]: {
        maxWidth: 300,
        marginLeft: theme.spacing(2)
      }
    },
    searchContainer: {
      [theme.breakpoints.down('sm')]: {
        gridRowStart: 1
      },
    },
    card: {
      width: "100%"
    },
    events: {
      display: "grid",
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: "100fr"
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: "100fr"
      },
      gridGap: theme.spacing(2)
    },
    eventsContainer: {
      flexGrow: 1
    },
    header: {
      padding: theme.spacing(2, 2, 1, 2)
    },
    linkFix: {
      textDecoration: "none",
      color: "inherit"
    }
  }),
);

const Events: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(true);
  const [events, setEvents] = useState<Event[]>(Array(5).fill({}));
  const [filtered, setFiltered] = useState<Event[]>(events);
  const { getTokenSilently } = useAuth0();

  function filterEvents(search: string, tags: string[]) {
    if (loading) return;
    let s: string = search.trim();
    let f: Event[] = events;
    if (search !== "") {
      f = f.filter(event => {
        return event.name.toLowerCase().includes(s.toLowerCase())
          || event.description.toLowerCase().includes(s.toLowerCase());  
      });
    }
    if (tags.length > 0) {
      let t: string[] = tags.map(tag => tag.toLowerCase());
      let m: MatchingEvent[] = f.map(event => {
        event.matchingTags = event.tags.reduce((accumulator, current) => {
          return t.includes(current.toLowerCase()) ? accumulator + 1 : accumulator;
        }, 0);
        return event as MatchingEvent;
      });
      m = m.filter(event => event.matchingTags > 0);
      m = m.sort((a, b) => {
        return b.matchingTags - a.matchingTags;
      });
      setFiltered(m);
    } else {
      setFiltered(f);
    }
  }

  useEffect(() => {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/event";
    let token: string;

    const fetchData = async () => {
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
        setFiltered(json.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [getTokenSilently]);

  return (
    <React.Fragment>
      <Container fixed className={classes.header}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link to="/" className={classes.linkFix}>
            {t("Home")}
          </Link>
          <Typography color="textPrimary">{t("Events")}</Typography>
        </Breadcrumbs>
      </Container>
        <Container fixed className={classes.container}>
          <div className={classes.eventsContainer}>
            <div className={classes.events}>
              {filtered.length > 0
                ? filtered.map(event => <Event
                    key={event.id}
                    id={event.id}
                    name={event.name}
                    group={event.group && event.group.name}
                    description={event.description}
                    tags={event.tags}
                    image={event.image}
                    cardClass={classes.card}
                  />)
                : <Event
                    name={"Oops"}
                    group={"Ohh no"}
                    description={"No events were found!"}
                    tags={[]}
                    image={"https://media.giphy.com/media/bkklBjAmlYjv2/giphy.gif"}
                    imageAlt={"Facepalm GIF"}
                    cardClass={classes.card}
                  />
              }
            </div>
          </div>
          <div className={classes.searchContainer}>
            <Search paperClass={classes.search} onSearch={filterEvents}/>
          </div>
        </Container>
    </React.Fragment>
  );
}

export default Events;