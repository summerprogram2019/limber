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
import Skeleton from 'react-loading-skeleton';

interface EventCoverProps {
  id?: number,
  name?: string,
  image?: string,
  imageAlt?: string,
  joined?: boolean,
  onJoin?: (id: number) => void
}

const useStyles = makeStyles((theme: Theme) => createStyles({
  card: {
    width: "100%"
  },
  media: {
    height: 280
  },
  overlay: {
    padding: theme.spacing(1)
  },
  grow: {
    flexGrow: 1
  },
  actions: {
    padding: theme.spacing(2)
  }
}));

const EventCover: React.FC<EventCoverProps> = ({ id, name, image, imageAlt, joined = false, onJoin }) => {
  const classes = useStyles();

  function handleClick() {
    if (onJoin && id) {
      onJoin(id);
    }
  }

  return (
    <React.Fragment>
      <Card className={classes.card}>
        {
          image
            ? <CardMedia
            className={classes.media}
            image={image}
            title={imageAlt || ("Image of " + name)}
            />
            : <Skeleton height={280}/>
        }
        <CardActions className={classes.actions}>
          {
            name
              ? <Typography className={classes.overlay} variant="h5" component="h1">{name}</Typography>
              : <Skeleton width={200} height={30}/>
          }
          <div className={classes.grow} />
          <Button disabled={joined} onClick={handleClick} size="large" color="primary">
            {joined? "Joined" : "Join"}
          </Button>
        </CardActions>
      </Card>
    </React.Fragment>
  );
}

export default EventCover