import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { indexRoute } from "./routes/indexRoute.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(indexRoute);

const port = process.env.PORT;
app.listen(port, () => {
  console.log(`RUNNING IN PORT ${port}`);
});
