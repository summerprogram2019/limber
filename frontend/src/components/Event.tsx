import React, {useState} from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Typography, Chip, CssBaseline } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';
import QRDialog from './QR';
import { useAuth0 } from "../react-auth0-wrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    card: {
      display: "flex",
      [theme.breakpoints.down('xs')]: {
        flexDirection: "column"
      }
    },
    content: {
      width: "100%",
      display: "flex",
      flexDirection: "column"
    },
    media: {
      [theme.breakpoints.up('sm')]: {
        maxWidth: 200,
        minHeight: "100%"
      },
      [theme.breakpoints.down('xs')]: {
        width: "100%",
        height: 140
      }
    },
    actions: {
      display: "flex",
      padding: theme.spacing(2)
    },
    chip: {
      marginRight: theme.spacing(1)
    },
    grow: {
      flexGrow: 1
    },
    linkFix: {
      textDecoration: "none",
      color: "inherit"
    }
  }),
);

interface EventProps {
  id?: number,
  name?: string,
  start?: string,
  length?: number,
  group?: string,
  description?: string,
  image?: string,
  imageAlt?: string
  tags?: string[],
  joined?: boolean,
  onJoin?: (id: number) => void,
  cardClass?: string
}

const Event: React.FC<EventProps> = ({ id, name, start, length, group, description, image, imageAlt, tags, joined, onJoin, cardClass }) => {
  const classes = useStyles();
  const { t } = useTranslation();
  const [open, setOpen] = useState<boolean>(false);
  const {getTokenSilently} = useAuth0();
  const apiHost: string = "http://localhost:4000";
  const apiEndpoint: string = "/api/v1/group/join/";
  const url: string = apiHost + apiEndpoint + id;
  let hours: string, minutes: string;
  if (length && length >= 120) {
    hours = (Math.floor(length / 60)) + "hrs";
  } else if (length && length >= 60) {
    hours = "1hr";
  } else {
    hours= "";
  }
  if (length && length % 60 === 1) {
    minutes = "1min";
  } else if (length && length % 60 !== 0) {
    minutes = (length % 60) + "mins";
  } else {
    minutes = "";
  }

  function handleClick() {
    if (onJoin && id) {
      onJoin(id);
    }
  }

  function handleCloseModal() {
    setOpen(false);
  }

  function openQR() {
    setOpen(true);
  }

  return (
    <Card className={cardClass + " " + classes.card}>
      <CardActionArea className={classes.media}>
        <Link to={id ? ("/events/" + id) : "/events"}>
          { image
              ? <CardMedia
                  component="img"
                  alt={imageAlt || (name + " image")}
                  height="100%"
                  image={image}
                  title={imageAlt || (name + " image")}
                  />
              : <Skeleton height={"100%"}/>}
        </Link>
      </CardActionArea>
      <div className={classes.content}>
        <CardActionArea>
          <Link to={id ? ("/events/" + id) : "/events"} className={classes.linkFix}>
            <CardContent>
              <Typography gutterBottom variant="h5" component="h2" align="left">
                {name || <Skeleton/>}
              </Typography>
              {
                start && <Typography gutterBottom={length === undefined} variant="subtitle2" component="h4" align="left">
                  {start}
                </Typography>
              }
              {
                (hours || minutes) && <Typography gutterBottom variant="subtitle2" component="h4" align="left">
                  {hours}
                  {(hours && minutes) && " "}
                  {minutes}
                </Typography>
              }
              <Typography variant="subtitle2" color="textSecondary" component="p" align="left">
                {group || <Skeleton/>}
              </Typography>
              <Typography variant="body2" color="textSecondary" component="p" align="left">
                {description || <Skeleton count={2}/>}
              </Typography>
            </CardContent>
          </Link>
        </CardActionArea>
        <CardActions className={classes.actions}>
          {tags
            ? tags.map(tag => <Chip label={tag} className={classes.chip} />)
            : <Skeleton width={100} height={20}/>}
          <div className={classes.grow}></div>
          {id
            ? <Button disabled={joined} onClick={handleClick} size="small" color="primary">
                {t(joined ? "Joined": "Join")}
              </Button>
            : !name && <Skeleton width={50} height={20}/>}
          <Button onClick={openQR} size="small" color="primary">
            {t("QR")}
          </Button>
        </CardActions>
      </div>
      <QRDialog open={open} onClose={handleCloseModal} getTokenSilently={getTokenSilently} url={url} />
    </Card>
  );
};

export default Event;
