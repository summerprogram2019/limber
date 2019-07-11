import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, Badge } from '@material-ui/core';
import { Notifications as NotificationsIcon } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

interface NotificationsProps {
  buttonClass?: string
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 9,
    },
    button: {
      margin: 0,
      padding: 0
    },
    badge: {
      top: theme.spacing(1),
      right: theme.spacing(1)
    }
  }),
);

const Notifications: React.FC<NotificationsProps> = ({ buttonClass }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <React.Fragment>
      <IconButton color="primary" className={classes.button + " " + buttonClass}>
        <Badge badgeContent={8} color="secondary" classes={{badge: classes.badge}}>
          <NotificationsIcon className={classes.iconButton}/>
        </Badge>
      </IconButton>
    </React.Fragment>
  );
}

export default Notifications;