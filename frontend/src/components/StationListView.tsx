import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Station } from "../../../shared/dataTypes";

type Props = {
  stationData: Station[];
};
export default function StationListView({ stationData }: Props) {
  return (
    <Box>
      <Typography variant="h4">Stations</Typography>
      {stationData.map((station) => (
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            padding: 1,
            alignItems: "center",
          }}
        >
          <Typography>{station.finnishName}</Typography>
          <Button>read more</Button>
        </Box>
      ))}
    </Box>
  );
}
