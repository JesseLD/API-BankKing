import { Request, Response, Router } from "express";
import { userRoutes } from "./user.routes";

const routes = Router();

// V0 API
routes.get("/v0", (req, res) => {
  res.send("Hello World");
});

routes.use("/v0", userRoutes);

routes.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not found!" });
});
export default routes;
