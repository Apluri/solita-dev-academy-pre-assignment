import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Station } from "../../../shared/dataTypes";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";

type Props = {
  stationData: Station[];
  setSelectedStation: (station: Station) => void;
};
export default function StationListView({
  stationData,
  setSelectedStation,
}: Props) {
  function renderRow(props: ListChildComponentProps) {
    const { index, style } = props;

    return (
      <ListItem style={style} key={index} component="div" disablePadding>
        <ListItemButton onClick={() => setSelectedStation(stationData[index])}>
          <ListItemText primary={`${stationData[index].englishName}`} />
        </ListItemButton>
      </ListItem>
    );
  }
  return (
    <Box
      sx={{
        width: "100%",
        height: 400,
        maxWidth: 360,
      }}
    >
      <Typography variant="h4">Stations</Typography>
      <FixedSizeList
        height={400}
        width={360}
        itemSize={46}
        itemCount={stationData.length}
        overscanCount={5}
      >
        {renderRow}
      </FixedSizeList>
    </Box>
  );
}
