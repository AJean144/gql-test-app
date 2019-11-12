/* eslint-disable no-script-url */
import React from "react";
import { useQuery } from "@apollo/react-hooks";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Title from "./Title";
import { get, sum } from "lodash";
import moment from "moment";
import Divider from "@material-ui/core/Divider";
import ListItemText from "@material-ui/core/ListItemText";
import {PILOT_OVERVIEW} from '../queries/graphQLQueries'

const useStyles = makeStyles({
  textContext: {
    flex: 1
  }
});

const PilotOverview = () => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(PILOT_OVERVIEW);

  if (loading)
    return (
      <>
        <Title>Pilot Overview</Title>
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

  const pilot = get(data, "account.users[0]");
  const flights = pilot.flights;

  const totalDuration = moment.duration({
    seconds: sum(flights.map(flight => flight.duration))
  });

  const {
    _data: { days, hours, minutes }
  } = totalDuration;

  return (
    <>
      <Title>Pilot Overview</Title>
      <Typography component="p" variant="h5">
        {`${pilot.first_name} ${pilot.last_name}`}
      </Typography>
      <Typography color="textSecondary" className={classes.textContext}>
        {pilot.email}
      </Typography>

      <ListItemText
        primary={
          <>
            <Typography component="p" variant="h6">
              Total flight time:
            </Typography>
            <Typography component="p">
              {days} Days {hours} Hours {minutes} Minutes
            </Typography>
          </>
        }
      />

      <Divider />

      <ListItemText
        primary={
          <Typography
            color="textPrimary"
            component="p"
          >
            Total number of flights: {pilot.flights.length}
          </Typography>
        }
      />
    </>
  );
}

export default PilotOverview;
