import React, { Children } from "react";
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

const NavBar: React.FC = ({ children }) => {
  const classes = useStyles();

  return (
    <ElevationScroll>
      <AppBar position="sticky" color="primary">
        <Toolbar>
          {children}
          <Typography variant="h6" className={classes.title}>
            {/* Application Name */}
          </Typography>
          <ProfileAvatar />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default NavBar;