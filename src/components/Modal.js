import React, { useRef, useEffect } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { get } from "lodash";
import Title from "./Title";
import { Grid } from "@material-ui/core";
import DataTable from "./DataTable/index";

const Modal = ({
  open,
  handleClose,
  modalTitle,
  modalContent,
  data,
  getAllFlightData
}) => {
  const descriptionElementRef = useRef(null);
  useEffect(() => {
    const { current: descriptionElement } = descriptionElementRef;
    if (descriptionElement !== null) {
      descriptionElement.focus();
    }
  }, [open]);

  const flights = get(data, "account.users[0].flights");
  const { first_name, last_name } = get(data, "account.users[0]");

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullScreen
      scroll="paper"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title">{modalTitle}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText
          id="scroll-dialog-description"
          ref={descriptionElementRef}
          tabIndex={-1}
        >
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-start"
          >
            <Title>
              {first_name} {last_name}'s In-depth Flights Report
            </Title>
          </Grid>
          <DataTable
            data={flights}
            getAllFlightData={getAllFlightData}
          />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={() =>
            (window.location.href = `mailto:${data.account.users[0].email}?subject=In-depth%20Flight%20Report&body=message%20goes%20here`)
          }
          color="primary"
        >
          Email
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Modal;
