import express, { Request, Response } from "express";
import {
  Station,
  StationResponse,
  Trip,
  TripResponse,
} from "../../../shared/dataTypes";
import {
  getStation,
  getStationData,
  getTripData,
  getTripDataLength,
} from "../data/importCsv";

const router = express.Router();

router.get("/tripdata", (req: Request, res: Response) => {
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
      trips: getTripData(startIndex, endIndex),
      datasetSize: getTripDataLength(),
    };
    res.status(200).json(tripResponse);
    return;
  }

  const tripResponse: TripResponse = {
    trips: getTripData(0, maxRowsToFetch),
    datasetSize: getTripDataLength(),
  };
  res.status(200).json(tripResponse);
});
router.get("/stationdata", (req: Request, res: Response) => {
  const stationData = getStationData();
  res.status(200).json(stationData);
});
router.get("/stationdata/:stationID([0-9]+)", (req: Request, res: Response) => {
  const stationID = Number(req.params.stationID);

  const station = getStation(stationID);
  if (!station) {
    res.sendStatus(404);
    return;
  }

  const { totalTripsFromStation, totalTripsToStation } = getStationTripAmounts(
    getTripData(),
    station
  );
  const stationResponse: StationResponse = {
    station,
    totalTripsFromStation,
    totalTripsToStation,
  };
  res.status(200).json(stationResponse);
});

type StationTotalTrips = {
  totalTripsFromStation: number;
  totalTripsToStation: number;
};
function getStationTripAmounts(
  tripData: Trip[],
  station: Station
): StationTotalTrips {
  let totalTripsFromStation = 0;
  let totalTripsToStation = 0;
  tripData.forEach((trip) => {
    if (trip.departureStationId == station.id) totalTripsFromStation++;
    if (trip.returnStationId == station.id) totalTripsToStation++;
  });

  return { totalTripsFromStation, totalTripsToStation };
}

export default router;
