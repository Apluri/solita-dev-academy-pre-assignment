import express, { Request, Response } from "express";
import { Trip, Station } from "../../../shared/dataTypes";
import { getStationData, getTripData } from "../data/importCsv";

const router = express.Router();

//router.use(express.json())

router.get("/tripdata", async (req: Request, res: Response) => {
  const tripData = await getTripData();

  // before pagination send 500 first rows
  const trimmedData: Trip[] = [];
  for (let i = 0; i < 500; i++) {
    trimmedData.push(tripData[i]);
  }
  res.json(trimmedData);
});
router.get("/stationdata", async (req: Request, res: Response) => {
  const stationData = await getStationData();
  res.json(stationData);
});

export default router;
