import { Router } from "express";
import * as queueItems from "../../controllers/queueItemsController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", auth.optionalAuthenticate, queueItems.queueItemsList);

router.post("/", auth.optionalAuthenticate, queueItems.queueItemsCreate);

router.get("/:id", auth.optionalAuthenticate, queueItems.queueItemsGet);

router.put("/:id", auth.optionalAuthenticate, queueItems.queueItemsUpdate);

router.delete("/:id", auth.authenticate, queueItems.queueItemsDelete);

router.get(
  "/:uuid/joined",
  auth.optionalAuthenticate,
  queueItems.queueItemsJoined
);

export default router;
