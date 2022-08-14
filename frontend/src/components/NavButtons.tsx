import { Box } from "@mui/material";
import { Link } from "react-router-dom";

export default function NavButtons() {
  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Link to={"/trips"} style={{ fontSize: 40, marginRight: 10 }}>
        Trips
      </Link>
      <Link to={"/stations"} style={{ fontSize: 40, marginLeft: 10 }}>
        Stations
      </Link>
    </Box>
  );
}
