import React, { useEffect, useState } from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Container, Breadcrumbs, Typography } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EventCover from '../components/EventCover';
import EventInfo from '../components/EventInfo';
import PhotoGrid from '../components/PhotoGrid';
import Members from '../components/Members';
import Group from '../components/Group';
import { useAuth0 } from "../react-auth0-wrapper";

interface id {
  id: string
}

interface Group {
  id?: number,
  name?: string,
  description?: string,
  image?: string,
  tags?: string[],
  participating?: boolean
}

interface Event {
  id?: number,
  name?: string,
  description?: string,
  datetime?: string,
  length?: number,
  image?: string,
  participating?: boolean,
  group_owner?: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2, 1, 1, 1)
    },
    cover: {
      padding: theme.spacing(2, 1, 1, 1),
    },
    linkFix: {
      textDecoration: "none",
      color: "inherit"
    },
    mainContainer: {
      padding: theme.spacing(),
      [theme.breakpoints.up('md')]: {
        display: "flex",
        flexDirection: "row"
      },
      [theme.breakpoints.down('sm')]: {
        display: "grid",
        gridTemplateColumns: "100fr",
        gridGap: theme.spacing(2)
      }
    },
    descriptionContainer: {
      display: "grid",
      width: "100%",
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: "100fr"
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: "100fr"
      },
      gridGap: theme.spacing(2)
    },
    rightContainer: {
      minWidth: 300,
      [theme.breakpoints.up('md')]: {
        maxWidth: 300,
        marginLeft: theme.spacing(2)
      },
      [theme.breakpoints.down('sm')]: {
        gridRowStart: 1
      }
    },
    upcoming: {
    },
    members: {
    },
    group: {
      marginBottom: theme.spacing(2)
    }
  }),
);

const EventDetails: React.FC<RouteComponentProps<id>> = ({ match }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const { getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [group, setGroup] = useState<Group>({});
  const [groupId, setGroupId] = useState<number | null>(null);
  const [event, setEvent] = useState<Event>({});
  const id = match.params.id;

  useEffect(() => {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/event/" + id;
    let token: string;

    const fetchData = async () => {
      setLoading(true);
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
        setEvent(json.data);
        setGroupId(json.data.group_owner);
        setLoading(false);
      }
    };

    fetchData();
  }, [getTokenSilently]);

  useEffect(() => {
    if (groupId === null) {
      return;
    }
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/group/" + id;
    let token: string;

    const fetchData = async () => {
      setLoading(true);
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
        setGroup(json.data);
        setLoading(false);
      }
    };

    fetchData();
  }, [groupId]);

  async function joinEvent(id: number) {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/event/join/" + id;
    let token: string;
    try {
      token = await getTokenSilently();
    } catch (error) {
      token = "";
    }
    let response: Response = await fetch(apiHost + apiEndpoint, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    let json = await response.json();
    if (json.success) {
      setJoined(true);
    }
  }

  return (
    <React.Fragment>
      <Container fixed className={classes.header}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link to="/" className={classes.linkFix}>
            {t("Home")}
          </Link>
          <Link to="/events" className={classes.linkFix}>
            {t("Events")}
          </Link>
          <Typography color="textPrimary">{(event && event.name) ? event.name : match.params.id}</Typography>
        </Breadcrumbs>
      </Container>
      { /* Group Cover */}
      <Container fixed className={classes.cover}>
        <EventCover id={event.id} name={event.name} image={event.image} joined={event.participating || joined} onJoin={joinEvent}/>
      </Container>
      { /* Group under top box */}
      <Container fixed className={classes.mainContainer}>
        { /* Group Description */}
        <div className={classes.descriptionContainer}>
          <EventInfo description={event.description} time={event.datetime} duration={event.length}/>
        </div>
        { /* Right side upcoming events and members */}
        <div className={classes.rightContainer}>
          { /* Members */}
          <Group
            small
            id={group.id}
            name={group.name}
            description={group.description}
            tags={group.tags}
            image={group.image}
            joined={group.participating}
            cardClass={classes.group}
          />
          <div className={classes.members}>
            <Members members={[
              { name: "Billy Schulze", picture: "https://i0.wp.com/cdn.auth0.com/avatars/bi.png?ssl=1" },
              { name: "Yazaru Uru", picture: "https://www.bing.com/th?id=OIP.tvDzCyvwFvkxzn91PZ_qBgHaGL&w=233&h=194&c=7&o=5&pid=1.7" },
              { name: "Emerson Wu", picture: "https://i0.wp.com/cdn.auth0.com/avatars/em.png?ssl=1" }, 
              { name: "Yazaru Uru", picture: "https://www.bing.com/th?id=OIP.VTkxo1eE2ej2B_rjFtM2lgHaHa&pid=Api&rs=1&p=0" },
              { name: "Sunny Lee", picture: "https://i0.wp.com/cdn.auth0.com/avatars/sl.png?ssl=1" }, 
              { name: "Kit Kat", picture: "https://i0.wp.com/cdn.auth0.com/avatars/kk.png?ssl=1" }, 
              { name: "Machine Learning", picture: "https://i0.wp.com/cdn.auth0.com/avatars/ml.png?ssl=1" }, 
              { name: "Frank Ku", picture: "https://i0.wp.com/cdn.auth0.com/avatars/fk.png?ssl=1" }, 
              { name: "Yazaru Uru", picture: "https://i0.wp.com/cdn.auth0.com/avatars/yu.png?ssl=1" },
              { name: "Yazaru Uru", picture: "https://i0.wp.com/cdn.auth0.com/avatars/ks.png?ssl=1" },
              { name: "Yazaru Uru", picture: "https://www.bing.com/th?id=OIP.Zb5-XDMwL991BL0cXnqj-gHaHa&pid=Api&rs=1&p=0" },
              { name: "Yazaru Uru", picture: "https://www.bing.com/th?id=OIP.gObgjMoH_5mblgxlJ8GrtQHaHa&pid=Api&rs=1&p=0" }

            ]} />
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default EventDetails;