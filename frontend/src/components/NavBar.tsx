import React from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography } from '@material-ui/core';

import ProfileAvatar from "./ProfileAvatar";
import Create from './Create';
import Notifications from './Notifications';
import ElevationScroll from "./ElevationScroll";

interface NavBarProps {
  auth: {
    isAuthenticated: any,
    loading: any,
    user?: any,
    getTokenSilently: any,
    loginWithRedirect?: any,
    logout?: any,
    authRequest: (event: React.MouseEvent<EventTarget>, callback: (event: React.MouseEvent<EventTarget>) => void) => void
  }
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    mr: {
      marginRight: theme.spacing(2)
    }
  }),
);

const NavBar: React.FC<NavBarProps> = (props) => {
  const classes = useStyles();
  const { isAuthenticated, loading, user, loginWithRedirect, logout, authRequest, getTokenSilently } = props.auth;
  return (
    <ElevationScroll {...props}>
      <AppBar color="default">
        <Toolbar>
          {props.children}
          <Typography variant="h6" className={classes.title}>
            {/* Application Name */}
          </Typography>
          {isAuthenticated && 
            <React.Fragment>
              <Create buttonClass={classes.mr} getTokenSilently={getTokenSilently}/>
              <Notifications buttonClass={classes.mr}/>
            </React.Fragment>
          }
          <ProfileAvatar
            isAuthenticated={isAuthenticated}
            loading={loading}
            user={user}
            loginWithRedirect={loginWithRedirect}
            logout={logout}
            authRequest={authRequest}
          />
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default NavBar;