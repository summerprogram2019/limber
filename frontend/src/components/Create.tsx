import React, { useState } from "react";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { IconButton, MenuItem, Popper, Paper, ClickAwayListener, MenuList, Grow } from '@material-ui/core';
import { Add, Group, Event } from "@material-ui/icons";
import { useTranslation } from "react-i18next";

import CreateGroupDialog from './CreateGroupDialog';

interface CreateProps {
  buttonClass?: string,
  getTokenSilently: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    iconButton: {
      padding: 9,
    },
    button: {
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

const Create: React.FC<CreateProps> = ({ buttonClass, getTokenSilently }) => {
  const { t } = useTranslation();
  const classes = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [groupOpen, setGroupOpen] = useState<boolean>(false);
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

  function handleCloseModal() {
    setGroupOpen(false);
  }

  function openGroup() {
    setOpen(false);
    setGroupOpen(true);
  }

  return (
    <React.Fragment>
      <IconButton color="primary" className={classes.button + " " + buttonClass} onClick={handleToggle} ref={anchorRef}>
        <Add className={classes.iconButton}/>
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
                  <MenuItem onClick={openGroup}><Group className={classes.icon} />{t("Create Group")}</MenuItem>
                  <MenuItem onClick={() => {}}><Event className={classes.icon} />{t("Create Event")}</MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
      <CreateGroupDialog open={groupOpen} onClose={handleCloseModal} getTokenSilently={getTokenSilently}/>
    </React.Fragment>
  );
}

export default Create;