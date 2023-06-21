import { Router } from "express";
import * as anyQueueItems from "../../controllers/anyQueueItemsController";
import * as auth from "../../middleware/auth/authenticator";

const router = Router();

router.get("/", auth.optionalAuthenticate, anyQueueItems.anyQueueItemsList);

router.get(
  "/:shopId/:userUsername",
  auth.optionalAuthenticate,
  anyQueueItems.anyQueueItemsGet
);

router.post("/", auth.authenticate, anyQueueItems.anyQueueItemsCreate);

router.delete(
  "/:shopId/:userUsername",
  auth.authenticate,
  anyQueueItems.anyQueueItemsDelete
);

export default router;
