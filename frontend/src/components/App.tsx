import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Station, Trip } from "../../../shared/dataTypes";
import axios from "axios";
import TripListView from "./TripListView";
import StationListView from "./StationListView";

const BASE_API_URL = "http://localhost:8080";
const TRIP_DATA_URL = "/tripdata";
const STATION_DATA_URL = "/stationdata";

function App() {
  const [tripData, setTripdata] = useState<Trip[]>([]);
  const [stationData, setStationData] = useState<Station[]>([]);

  async function fetchTripData() {
    try {
      const response = await axios.get(BASE_API_URL + TRIP_DATA_URL);
      setTripdata(response.data);
    } catch (e) {
      console.log(e);
    }
  }
  async function fetchStationData() {
    try {
      const response = await axios.get(BASE_API_URL + STATION_DATA_URL);
      setStationData(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTripData();
    fetchStationData();
  }, []);

  return (
    <Box>
      <TripListView tripData={tripData} />
      <StationListView stationData={stationData} />
    </Box>
  );
}

export default App;
