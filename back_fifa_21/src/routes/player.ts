import { Router } from "express";
import {
  findPlayerByTeamName,
  findPlayerByName,
  healthcheck,
} from "../controller/player.controller";
import { checkApiKey, validate as validateRequest } from "../middleware";

import {
  findPlayerByTeamNameSchema,
  findPlayerByNameSchema,
} from "../schema/player.schema";

const router = Router();

router.get("/healthcheck", healthcheck);

router.post(
  "/team",
  [checkApiKey, validateRequest(findPlayerByTeamNameSchema)],
  findPlayerByTeamName
);

// router get player by name
router.get(
  "/players",
  [checkApiKey, validateRequest(findPlayerByNameSchema)],
  findPlayerByName
);

export default router;
