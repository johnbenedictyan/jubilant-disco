import { Router } from "express";
import * as queueItems from "../../controllers/queueItemsController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", auth.optionalAuthenticate, queueItems.queueItemsList);

router.get(
  "/:shopId/:userUsername",
  auth.optionalAuthenticate,
  queueItems.queueItemsGet
);

router.post("/", auth.authenticate, queueItems.queueItemsCreate);

router.put(
  "/:shopId/:userUsername",
  auth.authenticate,
  queueItems.queueItemsUpdate
);

router.delete(
  "/:shopId/:userUsername",
  auth.authenticate,
  queueItems.queueItemsDelete
);

export default router;
