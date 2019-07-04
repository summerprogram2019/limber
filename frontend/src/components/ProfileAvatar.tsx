import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, IconButton, Avatar, MenuItem, Popper, Paper, ClickAwayListener, MenuList, Grow } from '@material-ui/core';
import { Person, Settings, ExitToApp } from "@material-ui/icons";
import { useAuth0 } from "../react-auth0-wrapper";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    avatar: {
      margin: 3,
    },
    avatarButton: {
      margin: 0,
      padding: 0
    },
    dropdown: {
      minWidth: 200
    },
    icon: {
      padding: theme.spacing(0, 2, 0, 0),
      color: theme.palette.grey[600]
    }
  }),
);

const ProfileAvatar: React.FC = () => {
  const classes = useStyles();
  const { isAuthenticated, loading, user, getTokenSilently, loginWithRedirect, logout } = useAuth0();
  const [open, setOpen] = useState(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

  async function authRequest(event: React.MouseEvent<EventTarget>) {
    const apiHost: string = "http://localhost:4000";
    let token: string;
    try {
      token = await getTokenSilently();
    } catch (error) {
      token = "";
    }
    console.log(token);
    let response: Response = await fetch(apiHost + "/api/v1/auth", {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + token
      }
    });
    let json = await response.json();
    console.log(json);
    handleClose(event);
  }

  function handleClose(event: React.MouseEvent<EventTarget>) {
    if (anchorRef.current && anchorRef.current.contains(event.target as HTMLElement)) {
      return;
    }
    setOpen(false);
  }

  function handleToggle() {
    setOpen(prevOpen => !prevOpen);
  }

  function handleLogout(event: React.MouseEvent<EventTarget>) {
    logout();
    handleClose(event);
  }

  return (
    <React.Fragment>
      {!isAuthenticated && !loading && (
        <Button variant="contained" color="default"
          onClick={() =>
            loginWithRedirect({})
          }
        >
          Sign In
          </Button>
      )}
      {isAuthenticated && user &&
        <React.Fragment>
          <IconButton className={classes.avatarButton} onClick={handleToggle} ref={anchorRef}>
            <Avatar alt={user.nickname || user.name} src={user.picture} className={classes.avatar} />
          </IconButton>
          <Popper open={open} anchorEl={anchorRef.current} keepMounted={false} transition disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
              >
                <Paper id="menu-list-grow" className={classes.dropdown}>
                  <ClickAwayListener onClickAway={handleClose}>
                    <MenuList>
                      <MenuItem onClick={handleClose}><Person className={classes.icon} />Profile</MenuItem>
                      <MenuItem onClick={authRequest}><Settings className={classes.icon} />Settings</MenuItem>
                      <MenuItem onClick={handleLogout}><ExitToApp className={classes.icon} />Sign Out</MenuItem>
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </React.Fragment>
      }
    </React.Fragment>
  );
}

export default ProfileAvatar;