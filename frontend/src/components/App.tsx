import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Trip } from "../../../shared/dataTypes";
import axios from "axios";

const BASE_API_URL = "http://localhost:8080";
const TRIP_DATA = "/tripdata";

function App() {
  const [tripData, setTripdata] = useState<Trip[]>([]);

  async function fetchTripData() {
    try {
      const response = await axios.get(BASE_API_URL + TRIP_DATA);
      setTripdata(response.data);
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchTripData();
  }, []);

  return (
    <Box>
      <Typography>helo</Typography>
    </Box>
  );
}

export default App;
