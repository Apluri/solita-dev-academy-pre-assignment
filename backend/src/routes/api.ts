import express, { Request, Response } from "express";
import { getStationData, getTripData } from "../data/importCsv";

const router = express.Router();

router.get("/tripdata", async (req: Request, res: Response) => {
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

    res.status(200).json(await getTripData(startIndex, endIndex));
    return;
  }

  // limit to 500 for performance reasons
  res.status(200).json(await getTripData(0, maxRowsToFetch));
});
router.get("/stationdata", async (req: Request, res: Response) => {
  const stationData = await getStationData();
  res.status(200).json(stationData);
});

export default router;
