import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PhotoGrid from "../components/PhotoGrid";
import Announcments from "../components/Announcments";
import Skeleton from 'react-loading-skeleton';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { useTranslation } from "react-i18next";

interface EventInfoProps {
  description?: string,
  time?: string,
  duration?: number
}

const useStyles = makeStyles(theme => ({
  root: {
    padding: theme.spacing(2),
    display: "flex",
    flexDirection: "column",
  },
  heading: {
    textAlign: "left",
  },
  text: {
    textAlign: "left",
    padding: theme.spacing(1,0)
  },
  more: {
    padding: theme.spacing(1, 0)
  }
}));

const EventInfo: React.FC<EventInfoProps> = ({ description, time, duration }) => {
  const { t } = useTranslation();
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        {/* About this group*/}
        <Typography variant="h6" component="h3" className={classes.text}>
          {t("About this Event")}
        </Typography>
        {
          time && <Typography component="p" variant="body2" className={classes.text}>
              {t("Start:")} {moment(time).format("LLLL")}
            </Typography>
        }
        {
          time && duration && <Typography component="p" variant="body2" className={classes.text}>
              {t("End:")} {moment(time).add(duration, 'm').format("LLLL")}
            </Typography>
        }
        {
          description
            ? <Typography component="p" className={classes.text}>
                {description}
              </Typography>
            : <Skeleton count={5}/>
        }
        {/* Announcment block */}
        <Typography variant="h6" component="h3" className={classes.text}>
          {t("Announcments")}
        </Typography>
        <Announcments/>
        <div className={classes.more}>
          <Button color="primary" size="small">See More</Button>
        </div>
        {/* Photos */}
        <Typography variant="h6" component="h3" className={classes.text}>
          {t("Photos")}
        </Typography>
        <PhotoGrid/>
      </Paper>
    </div>
  );
}

export default EventInfo;