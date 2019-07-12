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

interface Member {
  name: string,
  profile: string,
  picture?: string
}

interface Event {
  id?: number,
  name?: string,
  description?: string,
  datetime?: string,
  length?: number,
  image?: string,
  participating?: boolean,
  members?: Member[],
  group_owner?: number,
  new?: boolean
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
  const { user, getTokenSilently } = useAuth0();
  const [loading, setLoading] = useState<boolean>(false);
  const [joined, setJoined] = useState<boolean>(false);
  const [group, setGroup] = useState<Group>({});
  const [groupId, setGroupId] = useState<number | null>(null);
  const [event, setEvent] = useState<Event>({});
  const id = match.params.id;

  let members;
  if (event.members) {
    members = event.members.slice();
    if (joined) {
      members.push({
        name: user.name,
        profile: user.picture,
        picture: user.picture
      });
    }
  }


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
        let event = json.data;
        event.members = event.members.map((member: Member) => {
          member.picture = member.profile;
          return member;
        })
        setEvent(event);
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
    const apiEndpoint: string = "/api/v1/group/" + groupId;
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
            <Members members={members}/>
          </div>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default EventDetails;