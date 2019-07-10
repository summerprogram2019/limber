import React, { useState, useEffect } from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Container, Typography, Breadcrumbs } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { Route, Link, RouteComponentProps } from 'react-router-dom';
import { useAuth0 } from "../react-auth0-wrapper";

import Search from '../components/Search';
import Group from '../components/Group';

interface Group {
  id: number,
  name: string,
  description: string,
  tags: string[],
  image: string,
  matchingTags?: number
}

interface MatchingGroup extends Group {
  matchingTags: number
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: theme.spacing(1),
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
    },
    linkFix: {
      textDecoration: "none",
      color: "inherit"
    }
  }),
);

const Groups: React.FC<RouteComponentProps> = () => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [groups, setGroups] = useState<Group[]>(Array(5).fill({}));
  const [filtered, setFiltered] = useState<Group[]>(groups);
  const { getTokenSilently } = useAuth0();

  function filterGroups(search: string, tags: string[]) {
    let s: string = search.trim();
    let f: Group[] = groups;
    if (search !== "") {
      f = f.filter(group => {
        return group.name.toLowerCase().includes(s.toLowerCase())
          || group.description.toLowerCase().includes(s.toLowerCase());  
      });
    }
    if (tags.length > 0) {
      let t: string[] = tags.map(tag => tag.toLowerCase());
      let m: MatchingGroup[] = f.map(group => {
        group.matchingTags = group.tags.reduce((accumulator, current) => {
          return t.includes(current.toLowerCase()) ? accumulator + 1 : accumulator;
        }, 0);
        return group as MatchingGroup;
      });
      m = m.filter(group => group.matchingTags > 0);
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
    const apiEndpoint: string = "/api/v1/group";
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
        setGroups(json.data);
        setFiltered(json.data);
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
          <Typography color="textPrimary">{t("Groups")}</Typography>
        </Breadcrumbs>
      </Container>
        <Container fixed className={classes.container}>
          <div className={classes.groupsContainer}>
            <div className={classes.groups}>
              {filtered.length > 0
                ? filtered.map(group => <Group
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    description={group.description}
                    tags={group.tags}
                    image={group.image}
                    cardClass={classes.card}
                  />)
                : <Group
                    name={"Oops"}
                    description={"No groups were found!"}
                    tags={[]}
                    image={"https://media.giphy.com/media/bkklBjAmlYjv2/giphy.gif"}
                    imageAlt={"Facepalm GIF"}
                    cardClass={classes.card}
                  />
              }
            </div>
          </div>
          <div className={classes.searchContainer}>
            <Search paperClass={classes.search} onSearch={filterGroups}/>
          </div>
        </Container>
    </React.Fragment>
  );
}

export default Groups;