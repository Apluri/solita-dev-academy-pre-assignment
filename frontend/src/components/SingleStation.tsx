import { Typography, Box } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Station, StationResponse } from "../../../shared/dataTypes";
import { BASE_API_URL, STATION_DATA_URL } from "./App";

type Props = {
  station?: Station;
};
export default function SingleStation({ station }: Props) {
  const [stationResponse, setStationResponse] = useState<StationResponse>();

  async function fetchStationInfo() {
    try {
      const response = await axios.get(
        BASE_API_URL + STATION_DATA_URL + "/" + station?.id
      );
      setStationResponse(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchStationInfo();
  }, [station]);

  if (!station)
    return (
      <Box>
        <Typography>Select some station to see more info</Typography>
      </Box>
    );

  return (
    <Box sx={{ marginX: "2em" }}>
      <Typography variant="h6">Station info</Typography>
      <Typography>
        Station name: <b>{stationResponse?.station.englishName}</b>
      </Typography>
      <Typography>
        Station address: <b>{stationResponse?.station.address}</b>
      </Typography>
      <Typography>
        Total number of journeys starting from the station:
        <b>{stationResponse?.totalTripsFromStation}</b>
      </Typography>
      <Typography>
        Total number of journeys ending at the station:
        <b>{stationResponse?.totalTripsToStation}</b>
      </Typography>
    </Box>
  );
}
