import express, { Request, Response } from "express";
import { TripResponse } from "../../../shared/dataTypes";
import {
  getStationData,
  getTripData,
  getTripDataLength,
} from "../data/importCsv";

const router = express.Router();

router.get("/tripdata", async (req: Request, res: Response) => {
  // limit fetch to smaller ones for perfomance reasons
  const maxRowsToFetch = 500;

  const query = req.query;
  if (query.startindex && query.endindex) {
    const startIndex: number = parseInt(query.startindex as string);
    const endIndex: number = parseInt(query.endindex as string);

    if (!(startIndex || endIndex)) {
      res.sendStatus(404);
      return;
    }

    if (endIndex - startIndex > maxRowsToFetch) {
      res.sendStatus(400);
      return;
    }

    const tripResponse: TripResponse = {
      trips: await getTripData(startIndex, endIndex),
      datasetSize: getTripDataLength(),
    };
    res.status(200).json(tripResponse);
    return;
  }

  const tripResponse: TripResponse = {
    trips: await getTripData(0, maxRowsToFetch),
    datasetSize: getTripDataLength(),
  };
  res.status(200).json(tripResponse);
});
router.get("/stationdata", async (req: Request, res: Response) => {
  const stationData = await getStationData();
  res.status(200).json(stationData);
});

export default router;
