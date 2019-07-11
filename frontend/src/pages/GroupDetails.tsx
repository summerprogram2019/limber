import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Container, Breadcrumbs, Typography } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import EventCover from '../components/EventCover';
import GroupInfo from '../components/GroupInfo';
import PhotoGrid from '../components/PhotoGrid';
import Members from '../components/Members';
import { object } from 'prop-types';

interface id {
  id: string
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
      }
    },
    upcoming: {
    },
    members: {
    },
    group: {
      flexGrow: 1
    }
  }),
);

const GroupsDetails: React.FC<RouteComponentProps<id>> = ({ match }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <Container fixed className={classes.header}>
        <Breadcrumbs aria-label="Breadcrumb">
          <Link to="/" className={classes.linkFix}>
            {t("Home")}
          </Link>
          <Link to="/groups" className={classes.linkFix}>
            {t("Groups")}
          </Link>
          <Typography color="textPrimary">{match.params.id}</Typography>
        </Breadcrumbs>
      </Container>
      { /* Group Cover */}
      <Container fixed className={classes.cover}>
        <EventCover />
      </Container>
      { /* Group under top box */}
      <Container fixed className={classes.mainContainer}>
        { /* Group Description */}
        <div className={classes.descriptionContainer}>
          <GroupInfo />
        </div>
        { /* Right side upcoming events and members */}
        <div className={classes.rightContainer}>
          { /* Members */}
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

export default GroupsDetails;