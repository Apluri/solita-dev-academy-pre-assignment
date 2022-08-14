import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Trip, TripResponse } from "../../../../shared/dataTypes";
import axios from "axios";
import { BASE_API_URL } from "../App";

import TablePaginationActions from "./TablePaginationActions";
import { Typography } from "@mui/material";
import { Box } from "@mui/system";

const TRIP_DATA_URL = "/tripdata";

interface Column {
  key:
    | "departureStationName"
    | "returnStationName"
    | "coveredDistanceMeters"
    | "durationSeconds";
  label: string;
  align?: "right";
}

const columns: Column[] = [
  { key: "departureStationName", label: "Departure Station" },
  { key: "returnStationName", label: "Return Station" },
  {
    key: "coveredDistanceMeters",
    label: "Covered Distance (km)",
    align: "right",
  },
  {
    key: "durationSeconds",
    label: "Duration (min)",
    align: "right",
  },
];

export default function TripListView() {
  const [tripData, setTripdata] = useState<Trip[]>([]);
  const [datasetSize, setDatasetSize] = useState<number>(0);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [editedTripData, setEditedTripData] = useState<Trip[]>([]);

  async function fetchTripData() {
    try {
      const startIndex: number = page * rowsPerPage;
      const endIndex: number = page * rowsPerPage + rowsPerPage;
      const extraQuery = `?startindex=${startIndex}&endindex=${endIndex}`;
      const response = await axios.get(
        BASE_API_URL + TRIP_DATA_URL + extraQuery
      );
      const tripResponse: TripResponse = response.data;

      setTripdata(tripResponse.trips);
      setDatasetSize(tripResponse.datasetSize);
    } catch (e) {
      console.log(e);
    }
  }
  useEffect(() => {
    fetchTripData();
  }, [page, rowsPerPage]);

  useEffect(() => {
    editTripData();
  }, [tripData]);

  function editTripData() {
    setEditedTripData(convertDistanceToKM(convertDurationToMin(tripData)));
  }
  function convertDistanceToKM(tripData: Trip[]): Trip[] {
    return tripData.map((trip) => {
      return {
        ...trip,
        coveredDistanceMeters: parseFloat(
          (trip.coveredDistanceMeters / 1000).toFixed(2)
        ),
      };
    });
  }

  function convertDurationToMin(tripData: Trip[]): Trip[] {
    return tripData.map((trip) => {
      return {
        ...trip,
        durationSeconds: parseFloat((trip.durationSeconds / 60).toFixed(2)),
      };
    });
  }
  function handleChangePage(event: unknown, newPage: number) {
    setPage(newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  return (
    <Box sx={{ width: "100%" }}>
      <Typography variant="h4">Trips</Typography>
      <Paper>
        <TableContainer sx={{ maxHeight: 600 }}>
          <Table stickyHeader>
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell key={column.key} align={column.align}>
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {editedTripData.map((row, index) => {
                return (
                  <TableRow hover key={index}>
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <TableCell
                          key={column.key}
                          align={column.align}
                          sx={{ width: `${100 / columns.length}%` }}
                        >
                          {value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={datasetSize}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          ActionsComponent={(props) => <TablePaginationActions {...props} />}
        />
      </Paper>
    </Box>
  );
}
