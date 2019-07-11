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
    flex: "none"
  },
  left: {
    textAlign: "left"
  }
}));

export default function Announcments() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  function handleExpandClick() {
    setExpanded(!expanded);
  }

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
        <Typography variant="h3" color="textSecondary" component="p">
          Upcoming AGM
        </Typography>
      </CardContent>
      <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="Show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent className={classes.left}>
          <Typography variant="h5">Agenda for AGM:</Typography>
          <Typography paragraph>
          Agenda for the Annual General Meeting of Shareholders of Akzo Nobel N.V. (the “Company”) to be held at the Hilton Hotel, Apollolaan 138, Amsterdam, the Netherlands, on Wednesday, April 22, 2015 starting at 2:00 p.m. (CET)    
          </Typography>
          <Typography>
          1.  Opening
          </Typography>
          <Typography>
          2.  Report of the Board of Management for the financial year 2014
          </Typography>
          <Typography>    
          3.  Financial Statements, result and dividend
          </Typography>
          <Typography> 
              (a)  Discussion on the implementation of the remuneration policy
              </Typography>
          <Typography>  
              (b)  Adoption of the 2014 Financial Statements of the Company (voting point) 
              </Typography>
          <Typography>   
              (c)  Discussion on the dividend policy   
              </Typography>
          <Typography>
              (d)  Profit allocation and adoption of the dividend proposal (voting point)
              </Typography>
          <Typography>
          4.  Discharge  
          </Typography>
          <Typography>
              (a)  Discharge from liability of members of the Board of Management in office in 2014 for the performance of their duties in 2014 (voting point)  
              </Typography>
          <Typography> 
              (b)  Discharge from liability of members of the Supervisory Board in office in 2014 for the performance of their duties in 2014 (voting point) 
              </Typography>
          <Typography>     
          5.  Supervisory Board  
          </Typography>
          <Typography>
              (a)  Appointment of  Mr. D. Sluimers (voting point) 
              </Typography>
          <Typography>
              (b)  Reappointment of Mrs. P. Bruzelius (voting point)
              </Typography>
          <Typography>  
          6.  Authorization for the Board of Management   
          </Typography>
          <Typography>
              (a)  to issue shares (voting point)
              </Typography>
          <Typography>
              (b)  to restrict or exclude the pre-emptive rights of shareholders (voting point)
              </Typography>
          <Typography>
          7.  Authorization for the Board of Management to acquire common shares in the share capital of the Company on behalf of the Company (voting point)  
          </Typography>
          <Typography>
          8.  Any other business and closing
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}