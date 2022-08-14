import { Box } from "@mui/material";
import TripListView from "./trip/TripListView";
import { Navigate, Route, Routes } from "react-router-dom";
import StationView from "./station/StationView";
import NavButtons from "./NavButtons";

export const BASE_API_URL = "http://localhost:8080/api";
export const STATION_DATA_URL = "/stationdata";

function App() {
  return (
    <Box sx={{ margin: "2em" }}>
      <NavButtons />
      <Routes>
        {/**Navigate to trips by default or when user tries to access exact / path */}
        <Route path="/" element={<Navigate to={"/trips"} />} />
        <Route path="/trips" element={<TripListView />} />
        <Route path="/stations" element={<StationView />} />
      </Routes>
    </Box>
  );
}

export default App;
