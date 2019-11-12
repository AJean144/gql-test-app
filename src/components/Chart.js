import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Label,
  ResponsiveContainer
} from "recharts";
import Title from "./Title";
import { useQuery } from "@apollo/react-hooks";
import { get } from "lodash";
import moment from "moment";
import Typography from "@material-ui/core/Typography";
import {FLIGHT_STATS} from '../queries/graphQLQueries'

function createData(time, amount) {
  return { time, amount };
}

const Chart = () => {
  const { loading, error, data } = useQuery(FLIGHT_STATS);
  if (loading)
    return (
      <>
        <Title>Flight Stats</Title>
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

  const allFlights = get(data, "account.users[0].flights");

  const allFlightDurationsData = allFlights.map(flight => {
    const duration = moment.duration(flight.duration, "seconds");
    const {
      _data: { minutes, seconds }
    } = duration;
    return createData(`${minutes}:${seconds}`, flight.duration);
  });

  return (
    <>
      <Title>Flight Stats</Title>
      <ResponsiveContainer>
        <LineChart
          data={allFlightDurationsData}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24
          }}
        >
          <XAxis dataKey="time" />
          <YAxis>
            <Label angle={270} position="left" style={{ textAnchor: "middle" }}>
              Flights
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="amount" stroke="#556CD6" dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}

export default Chart;
