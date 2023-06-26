import { Router } from "express";
import * as queueItems from "../../controllers/queueItemsController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", auth.optionalAuthenticate, queueItems.queueItemsList);

router.get(
  "/:uuid/joined",
  auth.optionalAuthenticate,
  queueItems.queueItemsJoined
);

router.get("/:id", auth.optionalAuthenticate, queueItems.queueItemsGet);

router.post("/", auth.optionalAuthenticate, queueItems.queueItemsCreate);

router.put("/:id", auth.optionalAuthenticate, queueItems.queueItemsUpdate);

router.delete("/:id", auth.authenticate, queueItems.queueItemsDelete);

export default router;
