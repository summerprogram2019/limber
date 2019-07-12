import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, Button, useMediaQuery } from '@material-ui/core';
import { useTranslation } from "react-i18next";
interface CreateGroupDialogProps {
  open: boolean,
  onClose: () => void,
  getTokenSilently: any
}

const CreateGroupDialog: React.FC<CreateGroupDialogProps> = ({ open, onClose, getTokenSilently }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fullScreen = useMediaQuery('(max-width:600px)');
  const nameRef = React.useRef<HTMLInputElement>(null);
  const descRef = React.useRef<HTMLInputElement>(null);
  const tagsRef = React.useRef<HTMLInputElement>(null);
  const imgRef = React.useRef<HTMLInputElement>(null);

  async function createGroup() {
    setLoading(true);
    const apiHost: string = "http://localhost:4000";
    const apiEndpoint: string = "/api/v1/group"
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
        image: imgRef.current && imgRef.current.value
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

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} aria-labelledby="create-group-dialog">
      <DialogTitle id="create-group-dialog">Create a Group</DialogTitle>
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
              </React.Fragment>
        }
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} color="primary">
          {t("Cancel")}
        </Button>
        <Button disabled={loading || !!error} onClick={createGroup} color="primary">
          {t("Create")}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default CreateGroupDialog;