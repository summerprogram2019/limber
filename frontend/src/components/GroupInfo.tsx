import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PhotoGrid from "../components/PhotoGrid";
import Announcments from "../components/Announcments";
import Skeleton from 'react-loading-skeleton';
import { Button } from '@material-ui/core';
import { useTranslation } from 'react-i18next';

interface GroupInfoProps {
  description?: string
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

const GroupInfo: React.FC<GroupInfoProps> = ({ description }) => {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        {/* About this group*/}
        <Typography variant="h6" component="h3" className={classes.text}>
          About this Group
        </Typography>
        {
          description
            ? <Typography component="p" className={classes.text}>
                {description}
              </Typography>
            : <Skeleton count={5}/>
        }
        {/* Announcment block */}
        <Typography variant="h6" component="h3" className={classes.text}>
          Announcments
        </Typography>
        <Announcments/>
        <div className={classes.more}>
          <Button color="primary" size="small">See More</Button>
        </div>
        {/* Photos */}
        <Typography variant="h6" component="h3" className={classes.text}>
          Photos
        </Typography>
        <PhotoGrid/>
      </Paper>
    </div>
  );
}

export default GroupInfo;