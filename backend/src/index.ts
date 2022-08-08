import express, { Request, Response } from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("helo");
});

app.listen(5000, () => {
  console.log("serverr running");
});
