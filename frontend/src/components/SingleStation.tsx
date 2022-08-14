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
    <Box>
      <Typography>Station info</Typography>
      <Typography>
        Station name: {stationResponse?.station.englishName}
      </Typography>
      <Typography>
        Station address: {stationResponse?.station.address}
      </Typography>
      <Typography>
        Total number of journeys starting from the station:
        {stationResponse?.totalTripsFromStation}
      </Typography>
      <Typography>
        Total number of journeys ending at the station:
        {stationResponse?.totalTripsToStation}
      </Typography>
    </Box>
  );
}
