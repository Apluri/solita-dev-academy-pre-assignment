import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
const url = "http:localhost:8000";

function App() {
  useEffect(() => {
    fetch(url)
      .then((data) => console.log(data))
      .catch((e) => console.log(e));
  }, []);

  return (
    <Box>
      <Typography>helo</Typography>
    </Box>
  );
}

export default App;
