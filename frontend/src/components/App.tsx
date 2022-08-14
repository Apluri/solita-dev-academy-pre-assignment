import { Box } from "@mui/material";
import { Station } from "../../../shared/dataTypes";
import TripListView from "./TripListView";
import StationListView from "./StationListView";
import SingleStation from "./SingleStation";
import { Navigate, Route, Routes } from "react-router-dom";
import StationView from "./StationView";

export const BASE_API_URL = "http://localhost:8080/api";
export const STATION_DATA_URL = "/stationdata";

function App() {
  return (
    <Box sx={{ margin: "2em" }}>
      <Routes>
        {/**Navigate to trips by default or when user tries to access exact / path */}
        <Route path="/" element={<Navigate to={"/trips"} />} />
        <Route path="trips" element={<TripListView />} />
        <Route path="stations" element={<StationView />} />
      </Routes>
    </Box>
  );
}

export default App;
