import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyles = makeStyles(theme => ({
  card: {

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
  root: {
    flex: "none",
    textAlign: "left"
  },
  left: {
    textAlign: "left"
  }
}));

export default function Announcments() {
  const classes = useStyles();

  return (
    <Card className={classes.card}>
      <CardHeader
        avatar={
          <Avatar aria-label="Recipe" className={classes.avatar}>
            EW
          </Avatar>
        }
        title="Emerson Wu"
        subheader="June 14, 2019"
        classes={{content: classes.root}}
      />
      <CardContent>
        <Typography align="left" component="p" color="textSecondary">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean vel neque quam. Duis eget semper turpis. Etiam facilisis odio est, eu suscipit massa vulputate in. Ut in lacus a massa mollis pretium at sit amet nibh. Maecenas sit amet feugiat velit. Nam tortor metus, condimentum ut commodo id, mattis vel mauris. Nunc a ante vel libero ultrices blandit in vitae libero. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Nunc commodo diam eget justo ultricies luctus vel pellentesque risus. Ut nec magna sit amet lacus sollicitudin suscipit id at quam. Proin rhoncus iaculis vestibulum. Sed ornare eros ut turpis hendrerit viverra vel et mauris. 
        </Typography>
      </CardContent>
    </Card>
  );
}