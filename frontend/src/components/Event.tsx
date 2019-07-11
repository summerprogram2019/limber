import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardMedia, CardContent, Button, Typography, Chip, CssBaseline } from '@material-ui/core';
import { useTranslation } from "react-i18next";
import Skeleton from 'react-loading-skeleton';
import { Link } from 'react-router-dom';

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
  group?: string,
  description?: string,
  image?: string,
  imageAlt?: string
  tags?: string[],
  cardClass?: string
}

const Event: React.FC<EventProps> = ({ id, name, group, description, image, imageAlt, tags, cardClass }) => {
  const classes = useStyles();
  const { t } = useTranslation();

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
              <Typography variant="body2" color="textSecondary" component="p" align="left">
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
            ? <Button size="small" color="primary">
                {t("Join")}
              </Button>
            : !name && <Skeleton width={50} height={20}/>}
        </CardActions>
      </div>
    </Card>
  );
};

export default Event;