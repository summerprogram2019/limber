import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import PhotoGrid from "../components/PhotoGrid";
import Announcments from "../components/Announcments";
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
  }
}));

export default function GroupInfo() {
  const classes = useStyles();

  return (
    <div>
      <Paper className={classes.root}>
        {/* About this group*/}
        <Typography variant="h5" component="h3" className={classes.text}>
          About this group
        </Typography>
        <Typography component="p" className={classes.text}>
          Hi we are the foodies of UQ
        </Typography>
        {/* Announcment block */}
        <Typography variant="h5" component="h3" className={classes.text}>
          Announcments
        </Typography>
        <Announcments/>
        {/* Photos */}
        <Typography variant="h5" component="h3" className={classes.text}>
          Photos
        </Typography>
        <PhotoGrid/>
      </Paper>
    </div>
  );
}

