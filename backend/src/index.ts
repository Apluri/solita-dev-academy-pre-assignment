import express from "express";
import cors from "cors";
import { importCsvFiles } from "./data/importCsv";
import api from "./routes/api";

const app = express();
app.use(cors());
app.use("/api", api);

async function main() {
  // TODO when database is implemented, this should be removed or added behind if statement
  console.log("starting to import csv files...");
  await importCsvFiles();
  console.log("import complete");

  app.listen(8080, () => {
    console.log("server running");
  });
}

main();
