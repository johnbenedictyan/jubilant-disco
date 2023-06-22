import { Router } from "express";
import * as queueItems from "../../controllers/queueItemsController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", auth.optionalAuthenticate, queueItems.queueItemsList);

router.get(
  "/:queueHash/:userUsername/joined",
  auth.optionalAuthenticate,
  queueItems.queueItemsJoined
);

router.get("/:id", auth.optionalAuthenticate, queueItems.queueItemsGet);

router.post("/", auth.authenticate, queueItems.queueItemsCreate);

router.put("/:id", auth.authenticate, queueItems.queueItemsUpdate);

router.delete("/:id", auth.authenticate, queueItems.queueItemsDelete);

export default router;
