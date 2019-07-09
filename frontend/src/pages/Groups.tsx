import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Breadcrumbs, Link } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { useAuth0 } from "../react-auth0-wrapper";

import Search from '../components/Search';
import Group from '../components/Group';

interface Group {
  id: number,
  name: string,
  description: string,
  tags: string[],
  picture: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
      // backgroundColor: "red",
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
      // gridColumnStart: 2
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
      // gridColumnsStart: 0
      // marginBottom: 10,
      width: "100%"
    },
    groups: {
      display: "grid",
      [theme.breakpoints.up('lg')]: {
        gridTemplateColumns: "100fr"
      },
      [theme.breakpoints.down('md')]: {
        gridTemplateColumns: "100fr"
      },
      gridGap: theme.spacing(2)
    },
    groupsContainer: {
      flexGrow: 1
    },
    header: {
      padding: theme.spacing(2, 1, 1, 1)
    }
  }),
);

const Groups: React.FC = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Group[]>(Array(5).fill({}));
  const [loading, setLoading] = useState<boolean>(true);
  const { getTokenSilently } = useAuth0();

  useEffect(() => {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/group";
    let token: string;

    const fetchData = async () => {
      console.log("Fetching " + apiEndpoint + " data");
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
        console.log("Set " + apiEndpoint + " data");
        setGroups(json.data);
      }
    };

    fetchData();
  }, [getTokenSilently]);
  return (
    <React.Fragment>
      <Container fixed className={classes.header}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link color="inherit" href="/">
            {t("Home")}
          </Link>
          <Typography color="textPrimary">{t("Groups")}</Typography>
        </Breadcrumbs>
      </Container>
      <Container fixed className={classes.container}>
        <div className={classes.groupsContainer}>
          <div className={classes.groups}>
            {groups.map(group => <Group
              key={group.id}
              name={group.name}
              description={group.description}
              tags={group.tags}
              image={group.picture}
              cardClass={classes.card}
            />)}
          </div>
        </div>
        <div className={classes.searchContainer}>
          <Search paperClass={classes.search}/>
        </div>
      </Container>
    </React.Fragment>
  );
}

export default Groups;