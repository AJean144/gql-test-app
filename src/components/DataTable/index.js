import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import { get } from "lodash";
import {getTableColumns} from './getTableColumns'

const useStyles = makeStyles({
  root: {
    width: "100%"
  },
  tableWrapper: {
    maxHeight: 800,
    overflow: "auto"
  }
});

const DataTable = ({ data, columns, getAllFlightData }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const formatAndRenderData = data =>
    getAllFlightData
      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
      .map((row, i) => {
        return (
          <TableRow hover role="checkbox" tabIndex={-1} key={'row' + i}>
            {getTableColumns().map(column => {
              const value = row[column.id];
              if (column.id === "duration") {
                return (
                  <TableCell key={'cell' + i} align={column.align}>
                    {row.duration}
                  </TableCell>
                );
              }

              if (column.id === "aircraft") {
                return (
                  <TableCell key={column.id + i} align={column.align}>
                    {column.format(row.aircraft)}
                  </TableCell>
                );
              }

              if (column.id === "batteries") {
                const battery = get(row, "batteries[0]");
                return (
                  <TableCell key={column.id + i} align={column.align}>
                    {column.format(battery)}
                  </TableCell>
                );
              }

              if (column.id === "location") {
                return (
                  <TableCell key={column.id + i} align={column.align}>
                    {column.format(row.location)}
                  </TableCell>
                );
              }
              return (
                <TableCell key={column.id + i} align={column.align}>
                  {value && column.format
                    ? column.format(value)
                    : value || "N/A"}
                </TableCell>
              );
            })}
          </TableRow>
        );
      });

  return (
    <Paper className={classes.root}>
      <div className={classes.tableWrapper}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {getTableColumns().map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>{formatAndRenderData(data)}</TableBody>
        </Table>
      </div>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        backIconButtonProps={{
          "aria-label": "previous page"
        }}
        nextIconButtonProps={{
          "aria-label": "next page"
        }}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
};

export default DataTable;
