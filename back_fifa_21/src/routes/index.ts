
import { Router } from "express";

import player from "./player";

const routes = Router();
routes.use("/api/v1", player);

export default routes;