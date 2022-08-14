import { Paper, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Station } from "../../../../shared/dataTypes";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import { FixedSizeList, ListChildComponentProps } from "react-window";
import axios from "axios";
import { BASE_API_URL, STATION_DATA_URL } from "../App";
import { useEffect, useState } from "react";

type Props = {
  setSelectedStation: (station: Station) => void;
};
export default function StationListView({ setSelectedStation }: Props) {
  const [stationData, setStationData] = useState<Station[]>([]);

  async function fetchStationData() {
    try {
      const response = await axios.get(BASE_API_URL + STATION_DATA_URL);
      const stations: Station[] = response.data;
      setStationData(
        stations.sort((a, b) => (a.englishName > b.englishName ? 1 : -1))
      );
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchStationData();
  }, []);

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
    <Box>
      <Typography variant="h4">Stations</Typography>
      <Paper>
        <FixedSizeList
          height={window.innerHeight * 0.7}
          width={360}
          itemSize={46}
          itemCount={stationData.length}
          overscanCount={5}
        >
          {renderRow}
        </FixedSizeList>
      </Paper>
    </Box>
  );
}
