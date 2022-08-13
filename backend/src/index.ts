import express, { Request, Response } from "express";
import cors from "cors";
import { getTripData, getStationData, importCsvFiles } from "./data/importCsv";
import { Trip } from "../../shared/dataTypes";

const app = express();
app.use(cors());

app.get("/tripdata", async (req: Request, res: Response) => {
  const tripData = await getTripData();

  // before pagination send 500 first rows
  const trimmedData: Trip[] = [];
  for (let i = 0; i < 500; i++) {
    trimmedData.push(tripData[i]);
  }
  res.json(trimmedData);
});
app.get("/stationdata", async (req: Request, res: Response) => {
  const stationData = await getStationData();
  res.json(stationData);
});

async function main() {
  // TODO when database is implemented, this should be removed or added behind if statement
  await importCsvFiles();

  app.listen(8080, () => {
    console.log("serverr running");
  });
}

main();
