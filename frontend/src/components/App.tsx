import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Station, Trip } from "../../../shared/dataTypes";
import axios from "axios";
import TripListView from "./TripListView";
import StationListView from "./StationListView";

export const BASE_API_URL = "http://localhost:8080/api";
const STATION_DATA_URL = "/stationdata";

function App() {
  const [stationData, setStationData] = useState<Station[]>([]);

  async function fetchStationData() {
    try {
      const response = await axios.get(BASE_API_URL + STATION_DATA_URL);
      const stations: Station[] = response.data;
      setStationData(
        stations.sort((a, b) => (a.englishName > b.englishName ? 1 : -1))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchStationData();
  }, []);

  return (
    <Box>
      <TripListView />
      <StationListView stationData={stationData} />
    </Box>
  );
}

export default App;
