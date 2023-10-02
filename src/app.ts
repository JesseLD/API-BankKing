import dotenv from "dotenv";
import express, { Application } from "express";
import routes from "./Routes/index.routes";
import cors from "cors";
dotenv.config();

const app: Application = express();

app.use(cors());

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`>[server] Running on port ${process.env.PORT}`);
});
