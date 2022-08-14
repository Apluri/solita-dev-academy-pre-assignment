import { Typography, Box } from "@mui/material";
import React from "react";
import { Station } from "../../../shared/dataTypes";

type Props = {
  station?: Station;
};
export default function SingleStation({ station }: Props) {
  if (!station)
    return (
      <Box>
        <Typography>Select some station to see more info</Typography>
      </Box>
    );

  return (
    <Box>
      <Typography>Station info {station.englishName}</Typography>
    </Box>
  );
}
