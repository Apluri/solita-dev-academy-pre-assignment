import { Box } from "@mui/system";
import { useState } from "react";
import { Station } from "../../../shared/dataTypes";
import SingleStation from "./SingleStation";
import StationListView from "./StationListView";

export default function StationView() {
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);

  function deselectStation() {
    setSelectedStation(null);
  }
  return (
    <Box
      sx={{
        display: "flex",
        marginTop: "1em",
        justifyContent: "center",
      }}
    >
      <StationListView
        setSelectedStation={(station: Station) => setSelectedStation(station)}
      />
      <SingleStation station={selectedStation} onClose={deselectStation} />
    </Box>
  );
}
