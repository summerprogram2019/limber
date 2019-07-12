import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, Button, useMediaQuery } from '@material-ui/core';
import DateFns from 'date-fns';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import { useAuth0 } from "../react-auth0-wrapper";
import { useTranslation } from "react-i18next";

interface CreateEventDialogProps {
  open: boolean,
  onClose: () => void,
  getTokenSilently: any
}

interface Group {
  id: number,
  name: string,
  participating: boolean
}

const CreateEventDialog: React.FC<CreateEventDialogProps> = ({ open, onClose, getTokenSilently }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fullScreen = useMediaQuery('(max-width:600px)');
  const nameRef = React.useRef<HTMLInputElement>(null);
  const descRef = React.useRef<HTMLInputElement>(null);
  const starttimeRef = React.useRef<HTMLInputElement>(null);
  const startdateRef = React.useRef<HTMLInputElement>(null);
  const endtimeRef = React.useRef<HTMLInputElement>(null);
  const enddateRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);
  const imgRef = React.useRef<HTMLInputElement>(null);
  const groupRef = React.useRef<HTMLInputElement>(null);
  const [selectedDate, handleDateChange] = useState(new Date());
  const [values, setValues] = React.useState({
    group: '',
    name: '',
  });
  const [groups, setGroups] = React.useState<Group[]>([]);

  async function createEvent() {
    setLoading(true);
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/event";
    const startDateString: string | null = startdateRef.current && startdateRef.current.value;
    const startTimeString: string | null = starttimeRef.current && starttimeRef.current.value;
    const startDatetimeString: string | null = startDateString + "T" + startTimeString;
    const startDatetime: Date = new Date(startDatetimeString);
    const endDateString: string | null = enddateRef.current && enddateRef.current.value;
    const endTimeString: string | null = endtimeRef.current && endtimeRef.current.value;
    const endDatetimeString: string | null = endDateString + "T" + endTimeString;
    const endDatetime: Date = new Date(endDatetimeString);
    const eventLength: number = DateFns.differenceInMinutes(
      startDatetime,
      endDatetime
    );
    let token: string;
    try {
      token = await getTokenSilently();
    } catch (error) {
      token = "";
    }
    console.log(token);
    let response: Response = await fetch(apiHost + apiEndpoint, {
      method: 'POST',
      headers: {
        Authorization: 'Bearer ' + token,
        "content-type": "application/json"
      },
      body: JSON.stringify({
        name: nameRef.current && nameRef.current.value,
        description: descRef.current && descRef.current.value,
        tags: tagsRef.current && tagsRef.current.value.split(",").map(tag => tag.trim()),
        image: imgRef.current && imgRef.current.value,
        datetime: startDatetimeString,
        length: eventLength
      })
    });
    let json = await response.json();
    setLoading(false);
    if (json.success) {
      if (onClose) onClose();
    } else {
      setError("Error: " + (json.message ? json.message : JSON.stringify(json.errors)))
    }
  }

  function handleClose() {
    onClose();
    setLoading(false);
    setError(null);
  }

  function handleChange(event: React.ChangeEvent<{ name?: string; value: unknown }>) {
    setValues(oldValues => ({
      ...oldValues,
      [event.target.name as string]: event.target.value,
    }));
  }

  async function getGroups() {
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/group";
    let token: string;

    try {
      token = await getTokenSilently();
    } catch (error) {
      return;
    }
    let response: Response = await fetch(apiHost + apiEndpoint, {
      method: "GET",
      headers: {
        Authorization: 'Bearer ' + token
      }
    })
    let json = await response.json();
    if (json.success) {
      console.log(json.data);
      let filtered = json.data.filter((group: any) => (group.participating));
      return filtered;
    }
    return [];
  }

  useEffect(() => {
    const fetchData = async () => {
      let filtered = await getGroups();
      setGroups(filtered);
    };
    fetchData();
  }, [getTokenSilently]);

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} aria-labelledby="create-event-dialog">
      <DialogTitle id="create-event-dialog">{t("Create an Event")}</DialogTitle>
      <DialogContent>
        {
          error
            ? <DialogContentText>
                {error}
              </DialogContentText>
            : <React.Fragment>
                <TextField
                  inputRef={nameRef}
                  autoFocus
                  disabled={loading}
                  margin="dense"
                  id="name"
                  label={t("Name")}
                  fullWidth
                />
                <TextField
                  inputRef={descRef}
                  multiline
                  disabled={loading}
                  margin="dense"
                  id="description"
                  label={t("Description")}
                  fullWidth
                />
                <TextField
                  inputRef={startdateRef}
                  type='date'
                  disabled={loading}
                  id="startdate"
                  label={t("Start Date")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  inputRef={starttimeRef}
                  type='time'
                  disabled={loading}
                  id="starttime"
                  label={t("Start Time")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  inputRef={enddateRef}
                  type='date'
                  disabled={loading}
                  id="enddate"
                  label={t("End Date")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  inputRef={starttimeRef}
                  type='time'
                  disabled={loading}
                  id="endtime"
                  label={t("End Time")}
                  fullWidth
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
                <TextField
                  inputRef={tagsRef}
                  multiline
                  disabled={loading}
                  margin="dense"
                  id="tags"
                  label={t("Tags")}
                  placeholder="tag1, tag2"
                  fullWidth
                />
                <TextField
                  inputRef={imgRef}
                  disabled={loading}
                  margin="dense"
                  id="image"
                  label={t("Image")}
                  placeholder="URL of image"
                  fullWidth
                />
                <InputLabel shrink htmlFor="group-simple">{t("Group")}</InputLabel>
                <Select
                  fullWidth
                  id="group-owner"
                  disabled={loading}
                  inputRef={groupRef}
                  inputProps={{
                    name: 'group',
                    id: 'group-select',
                  }}
                >
                  <MenuItem key="0" value=""></MenuItem>
                  {groups.map(function (group: any) {
                    return (
                      <MenuItem key={group.id} value={group.id}>{group.name}</MenuItem>
                    );
                  })}
                </Select>
              </React.Fragment>
        }
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button disabled={loading || !!error} onClick={createEvent} color="primary">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateEventDialog;
