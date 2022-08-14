import { Box } from "@mui/material";
import { useState } from "react";
import { Station } from "../../../shared/dataTypes";
import TripListView from "./TripListView";
import StationListView from "./StationListView";
import SingleStation from "./SingleStation";

export const BASE_API_URL = "http://localhost:8080/api";
export const STATION_DATA_URL = "/stationdata";

function App() {
  const [selectedStation, setSelectedStation] = useState<Station>();

  return (
    <Box sx={{ margin: "2em" }}>
      <TripListView />
      <Box sx={{ display: "flex", marginTop: "2em" }}>
        <StationListView
          setSelectedStation={(station: Station) => setSelectedStation(station)}
        />
        <SingleStation station={selectedStation} />
      </Box>
    </Box>
  );
}

export default App;
