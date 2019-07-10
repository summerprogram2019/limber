import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { Container, Breadcrumbs, Typography } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface id {
  id: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    header: {
      padding: theme.spacing(2, 1, 1, 1)
    },
    linkFix: {
      textDecoration: "none",
      color: "inherit"
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
      { /* Group Details Content Here */ }
    </React.Fragment>
  );
}

export default GroupsDetails;