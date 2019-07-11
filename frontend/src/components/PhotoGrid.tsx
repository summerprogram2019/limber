import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

import image1 from '../images/1.jpg';
import image2 from '../images/2.jpg';
import image3 from '../images/3.jpg';
import image4 from '../images/4.jpg';
import image5 from '../images/5.jpg';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    // width: "100%",
    // height: "100%",
  },
}));
 
 const tileData = [
   {
     img: image1,
     title: 'Image',
     author: 'author',
    cols: 2,
   },
   {
    img: image2,
    title: 'Image',
    author: 'author',
   cols: 2,
  },
  {
    img: image3,
    title: 'Image',
    author: 'author',
   cols: 3,
  },
  {
    img: image4,
    title: 'Image',
    author: 'author',
   cols: 1,
  },
  {
    img: image5,
    title: 'Image',
    author: 'author',
   cols: 4,
  },
 ];

export default function PhotoGrid() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={160} className={classes.gridList} cols={4}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
