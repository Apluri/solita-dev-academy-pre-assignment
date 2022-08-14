import { Typography, Box, Dialog } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Station, StationResponse } from "../../../shared/dataTypes";
import { BASE_API_URL, STATION_DATA_URL } from "./App";

type Props = {
  station: Station | null;
  onClose: () => void;
};
export default function SingleStation({ station, onClose }: Props) {
  const [stationResponse, setStationResponse] =
    useState<StationResponse | null>();
  const [open, setOpen] = useState<boolean>(false);

  async function fetchStationInfo(): Promise<void> {
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
    if (!station) return;
    fetchStationInfo();
    setOpen(true);
  }, [station]);

  function handleClose(): void {
    setStationResponse(null);
    onClose();
    setOpen(false);
  }

  return (
    <Dialog onClose={handleClose} open={open}>
      <Box sx={{ marginX: "2em" }}>
        <Typography variant="h6">Station info</Typography>

        {stationResponse ? (
          <Box>
            <Typography>
              Station name: <b>{stationResponse?.station.englishName}</b>
            </Typography>
            <Typography>
              Station address: <b>{stationResponse?.station.address}</b>
            </Typography>
            <Typography>
              Total number of journeys starting from the station:
              <b>{stationResponse?.totalTripsFromStation}</b>
            </Typography>
            <Typography>
              Total number of journeys ending at the station:
              <b>{stationResponse?.totalTripsToStation}</b>
            </Typography>
          </Box>
        ) : (
          <Typography>Loading station data...</Typography>
        )}
      </Box>
    </Dialog>
  );
}
