import { readdir } from "fs";
import csv from "csvtojson";
import { Trip, Station } from "../../../shared/dataTypes";
import { Converter } from "csvtojson/v2/Converter";

const BASE_DIR = "./src/data/csv-files";
const TRIPS_DIR = BASE_DIR + "/trips/";
const STATION_INFO_DIR = BASE_DIR + "/station-info/";

let tripData: Trip[] = [];
let stationData: Station[] = [];

export async function importCsvFiles() {
  try {
    const tripFiles = await getFileNames(TRIPS_DIR);
    const stationFiles = await getFileNames(STATION_INFO_DIR);

    for (const filename of tripFiles) {
      const jsonTripData = await csvToJson(filename, TRIPS_DIR);
      const validatedTripData = validateJsonTrips(jsonTripData);
      tripData = [...tripData, ...validatedTripData];
    }

    for (const filename of stationFiles) {
      const jsonStationData = await csvToJson(filename, STATION_INFO_DIR);
      const validatedStationData = validateJsonStations(jsonStationData);
      stationData = [...stationData, ...validatedStationData];
    }
  } catch (err) {
    console.log(err);
  }

  return;
}

export async function getTripData(
  startIndex: number | null = null,
  endindex: number | null = null
): Promise<Trip[]> {
  if (startIndex == null || endindex == null) return tripData;

  return tripData.slice(startIndex, endindex);
}
export function getTripDataLength(): number {
  return tripData.length;
}

export async function getStationData(): Promise<Station[]> {
  return stationData;
}
export function getStation(id: number): Station | undefined {
  return stationData.find((station) => station.id == id);
}

function getFileNames(path: string): Promise<string[]> {
  return new Promise((resolve, reject) => {
    readdir(path, (error, filenames) => {
      error ? reject(error) : resolve(filenames);
    });
  });
}

function csvToJson(filename: string, dir: string): Converter {
  return csv({ flatKeys: true }).fromFile(dir + filename);
}

function validateJsonStations(jsonStations: any[]): Station[] {
  const keys: string[] = [];
  for (const key in jsonStations[0]) {
    keys.push(key);
  }

  const stations: Station[] = [];
  for (const jsonStation of jsonStations) {
    const station: Station = {
      fid: jsonStation[keys[0]],
      id: jsonStation[keys[1]],
      finnishName: jsonStation[keys[2]],
      swedishName: jsonStation[keys[3]],
      englishName: jsonStation[keys[4]],
      address: jsonStation[keys[5]],
      swedishAddress: jsonStation[keys[6]],
      city: jsonStation[keys[7]],
      swedishCity: jsonStation[keys[8]],
      operator: jsonStation[keys[9]],
      capasity: jsonStation[keys[10]],
      x: jsonStation[keys[11]],
      y: jsonStation[keys[12]],
    };
    stations.push(station);
  }

  return stations;
}

function validateJsonTrips(jsonTrips: any[]): Trip[] {
  const keys: string[] = [];
  for (const key in jsonTrips[0]) {
    keys.push(key);
  }

  const trips: Trip[] = [];
  for (const jsonTrip of jsonTrips) {
    const trip: Trip = {
      departureTime: jsonTrip[keys[0]],
      returnTime: jsonTrip[keys[1]],
      departureStationId: jsonTrip[keys[2]],
      departureStationName: jsonTrip[keys[3]],
      returnStationId: jsonTrip[keys[4]],
      returnStationName: jsonTrip[keys[5]],
      coveredDistanceMeters: jsonTrip[keys[6]],
      durationSeconds: jsonTrip[keys[7]],
    };
    trips.push(trip);
  }

  const minDuration = 10;
  const minDistance = 10;
  return trips.filter((trip) => {
    return (
      trip.coveredDistanceMeters >= minDistance &&
      trip.durationSeconds >= minDuration
    );
  });
}
