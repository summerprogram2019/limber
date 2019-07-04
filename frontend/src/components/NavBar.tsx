import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import ProfileAvatar from "./ProfileAvatar";
import ElevationScroll from "./ElevationScroll";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    }
  }),
);

const NavBar: React.FC = () => {
  const classes = useStyles();

  return (
    <React.Fragment>
      <ElevationScroll>
        <AppBar position="sticky" color="primary">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              {/* Application Name */}
            </Typography>
            <ProfileAvatar />
          </Toolbar>
        </AppBar>
      </ElevationScroll>
    </React.Fragment>
  );
};

export default NavBar;