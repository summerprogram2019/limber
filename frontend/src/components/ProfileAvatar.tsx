import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { Button, IconButton, Avatar, MenuItem, Popper, Paper, ClickAwayListener, MenuList, Grow, ButtonBase } from '@material-ui/core';
import { Person, Settings, ExitToApp, Group } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

interface ProfileAvatarProps {
  isAuthenticated: any,
  loading: any,
  user?: any,
  loginWithRedirect?: any,
  logout?: any,
  authRequest: (event: React.MouseEvent<EventTarget>, callback: (event: React.MouseEvent<EventTarget>) => void) => void
}

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

const ProfileAvatar: React.FC<ProfileAvatarProps> = ({ isAuthenticated, loading, user, loginWithRedirect, logout, authRequest }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const anchorRef = React.useRef<HTMLButtonElement>(null);

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
    if (logout) logout();
    handleClose(event);
  }

  return (
    <React.Fragment>
      {loading && (
        <Avatar alt={"profile"} className={classes.avatar}>
          <Person/>
        </Avatar>
      )}
      {!isAuthenticated && !loading && (
        <Button variant="contained" color="default"
          onClick={() =>
            loginWithRedirect({})
          }
        >
          {t("Sign In")}
          </Button>
      )}
      {isAuthenticated && user &&
        <React.Fragment>
          <IconButton className={classes.avatarButton} onClick={handleToggle} ref={anchorRef}>
            <Avatar alt={user.nickname || user.name} src={user.picture} className={classes.avatar}/>
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
                      <MenuItem onClick={handleClose}><Person className={classes.icon} />{t("Profile")}</MenuItem>
                      <MenuItem onClick={handleClose}><Group className={classes.icon} />{t("My Groups")}</MenuItem>
                      <MenuItem onClick={(event) => {authRequest(event, handleClose)}}><Settings className={classes.icon} />{t("Settings")}</MenuItem>
                      <MenuItem onClick={handleLogout}><ExitToApp className={classes.icon} />{t("Sign Out")}</MenuItem>
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