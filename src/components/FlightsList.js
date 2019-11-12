/* eslint-disable no-script-url */
import React, { useState } from "react";
import { useQuery } from "@apollo/react-hooks";
import { IN_DEPTH_FLIGHTS } from "../queries/graphQLQueries";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import moment from "moment";
import { Grid, Button } from "@material-ui/core";
import Modal from "./Modal";
import { get } from "lodash";

const FlightsList = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const { loading, error, data } = useQuery(IN_DEPTH_FLIGHTS);

  if (loading)
    return (
      <>
        <Title>Aircraft Types</Title>
        <Typography component="p" variant="h4">
          Loading...
        </Typography>
      </>
    );
  if (error)
    return (
      <Typography component="p" variant="h4">
        Something went wrong :(
      </Typography>
    );
  const flights = get(data, "account.users[0].flights");
  const getAllFlightData = flights.map(flight =>
    flight && flight.aircraft
      ? {
          ...flight,
          duration: moment.duration(flight.duration, "seconds").humanize()
        }
      : "N/A"
  );

  return (
    <>
      <Modal
        open={open}
        handleClose={handleClose}
        modalTitle="In-depth Report"
        getAllFlightData={getAllFlightData}
        data={data}
      />
      <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="flex-start"
      >
        <Title>Aircraft Types</Title>
        <Button variant="contained" color="primary" onClick={handleOpen}>
          In-depth Report
        </Button>
      </Grid>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Manufacturer</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Flight Time</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {flights.map((flight, i) => {
            const { aircraft } = flight;
            return (
              <TableRow key={flight.id}>
                <TableCell>
                  {aircraft ? aircraft.manufacturer : "N/A"}
                </TableCell>
                <TableCell>{aircraft ? aircraft.model : "N/A"}</TableCell>
                <TableCell>
                  {aircraft
                    ? moment.duration(flight.duration, "seconds").humanize()
                    : "N/A"}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
}

export default FlightsList;
