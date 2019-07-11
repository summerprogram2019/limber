import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { textAlign } from '@material-ui/system';


const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    width: "100%"
  },
  media: {
    height: 140
  },
  overlay: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(2),
    padding: theme.spacing(1, 1, 1, 1),
    backgroundColor: "white",
    borderRadius: 3
  },
  grow: {
    flexGrow: 1
  },
  button: {
  }
}));

const EventCover: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <Card className={classes.card}>
        <CardActionArea>
        <h1 className={classes.overlay}>
          UQ Food
        </h1>
          <CardMedia
            className={classes.media}
            image="https://cn.bing.com/th?id=OIP.A2tR0GuvxIgQGUGsYgZAagHaEo&pid=Api&rs=1&p=0"
            title="UQ Foodie"
          />
        </CardActionArea>
        <CardActions>
          <div className={classes.grow} />
          <Button size="small" color="primary">
            Join
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default EventCover