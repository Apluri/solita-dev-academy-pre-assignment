import React, { useEffect, useState } from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import { Trip } from "../../../shared/dataTypes";
import axios from "axios";
import { BASE_API_URL } from "./App";
import { IconButton, useTheme } from "@mui/material";
import { Box } from "@mui/system";

import FirstPageIcon from "@mui/icons-material/FirstPage";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import LastPageIcon from "@mui/icons-material/LastPage";

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

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
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
      const trips: Trip[] = response.data;
      setTripdata(trips);
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
    console.log(page + newPage);
    setPage(page + newPage);
  }

  function handleChangeRowsPerPage(event: React.ChangeEvent<HTMLInputElement>) {
    setRowsPerPage(+event.target.value);
    setPage(0);
  }

  function TablePaginationActions(props: TablePaginationActionsProps) {
    const theme = useTheme();
    const { count, rowsPerPage, onPageChange } = props;

    const handleFirstPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 0);
    };

    const handleBackButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, -1);
    };

    const handleNextButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, 1);
    };

    const handleLastPageButtonClick = (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onPageChange(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label="first page"
        >
          {theme.direction === "rtl" ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label="previous page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={false}
          aria-label="next page"
        >
          {theme.direction === "rtl" ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={false}
          aria-label="last page"
        >
          {theme.direction === "rtl" ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </Box>
    );
  }
  return (
    <Paper sx={{ width: "100%" }}>
      <TableContainer sx={{ maxHeight: 600 }}>
        <Table stickyHeader aria-label="sticky table">
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
        count={1200}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        ActionsComponent={TablePaginationActions}
      />
    </Paper>
  );
}
