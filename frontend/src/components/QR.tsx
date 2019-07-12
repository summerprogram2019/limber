import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogContentText, TextField, DialogActions, Button, useMediaQuery } from '@material-ui/core';
import { useAuth0 } from "../react-auth0-wrapper";
import QRCode from 'qrcode.react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

interface UrlProps {
  url: string,
  open: boolean,
  onClose: () => void,
  getTokenSilently: any
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    qr: {
      maxWidth: 500
    }
  }),
);

const QRDialog: React.FC<UrlProps> = ({url, open, onClose, getTokenSilently}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const fullScreen = useMediaQuery('(max-width:600px)');
  const classes = useStyles();

  function handleClose() {
    onClose();
    setLoading(false);
    setError(null);
  }

  return (
    <Dialog open={open} onClose={handleClose} fullScreen={fullScreen} aria-labelledby="qr-dialog">
      <DialogTitle id="qr-dialog">QR Code</DialogTitle>
      <DialogContent>
        {
          error
            ? <DialogContentText>
                {error}
              </DialogContentText>
            : <React.Fragment>
                <div className='classes.qr'>
                  <QRCode value={url} />
                </div>
              </React.Fragment>
        }
      </DialogContent>
      <DialogActions>
        <Button disabled={loading} onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default QRDialog;
