import dotenv from "dotenv";
import express, { Application } from "express";
import routes from "./Routes/index.routes";
dotenv.config();

const app: Application = express();

app.use("/api", routes);

app.listen(process.env.PORT, () => {
  console.log(`>[server] Running on port ${process.env.PORT}`);
});
