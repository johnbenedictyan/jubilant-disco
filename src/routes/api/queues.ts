import { Router } from "express";
import * as queues from "../../controllers/queuesController";
import * as auth from "../../middleware/auth/authenticator";
import * as validator from "../../middleware/queuesValidator";

const router = Router();

router.get(
  "/",
  auth.optionalAuthenticate,
  validator.queuesListValidator,
  queues.queuesList
);

router.get(
  "/shop/:shopId/shortest",
  auth.optionalAuthenticate,
  queues.queuesGetShortest
);

router.get("/:queueId", auth.optionalAuthenticate, queues.queuesGet);

router.post(
  "/",
  auth.authenticate,
  validator.queuesCreateValidator,
  queues.queuesCreate
);

router.put(
  "/:queueId",
  auth.authenticate,
  validator.queuesUpdateValidator,
  queues.queuesUpdate
);

router.delete("/:queueId", auth.authenticate, queues.queuesDelete);

export default router;
