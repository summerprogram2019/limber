import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    // height: "100%",
  },
}));
 
 const tileData = [
   {
     img: "https://cn.bing.com/th?id=OIP.apiBNN1dxdsS6tunI-VZUQHaEK&pid=Api&rs=1&p=0",
     title: 'Image',
     author: 'author',
    cols: 2,
   },
   {
    img: "https://s3.drafthouse.com/images/made/Alamo-Menu-June-2015-154_1280_720_81_s_c1.jpg",
    title: 'Image',
    author: 'author',
   cols: 2,
  },
  {
    img: "https://tse1-mm.cn.bing.net/th?id=OIP.4cE1ZYvWwO6f2aPdI2ShpgHaFV&w=266&h=190&c=7&o=5&dpr=2&pid=1.7",
    title: 'Image',
    author: 'author',
   cols: 3,
  },
  {
    img: "https://cn.bing.com/th?id=OIP.aVD28fcGCRrif6vpNOmKBgHaHA&pid=Api&rs=1&p=0",
    title: 'Image',
    author: 'author',
   cols: 1,
  },
  {
    img: "https://cn.bing.com/th?id=OIP.KRhABxCc5rQS0k4rn-zCBgHaFI&pid=Api&rs=1&p=0",
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
