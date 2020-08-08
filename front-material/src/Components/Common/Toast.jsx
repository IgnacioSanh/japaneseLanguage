import React, { useState, useEffect } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import Snackbar from "@material-ui/core/Snackbar";

const Toast = (props) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("Default Toast!");
  const [severity, setSeverity] = useState("info");

  useEffect(() => {
    setOpen(props.open);
    setMessage(props.message);
    setSeverity(props.severity);
  }, [props]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert onClose={handleClose} severity={severity}>
        {message}
      </Alert>
    </Snackbar>
  );
};

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default Toast;
