import { Router } from "express";

import * as shops from "../../controllers/shopController";
import * as auth from "../../middleware/auth/authenticator";
import * as validator from "../../middleware/shopsValidator";

const router = Router();

router.get(
  "/",
  auth.authenticate,
  validator.shopsListValidator,
  shops.shopsList
);

router.get("/:id", auth.optionalAuthenticate, shops.shopsGet);

router.post(
  "/",
  auth.authenticate,
  validator.shopsCreateValidator,
  shops.shopsCreate
);

router.put(
  "/:id",
  auth.authenticate,
  validator.shopsUpdateValidator,
  shops.shopsUpdate
);

router.delete("/:id", auth.authenticate, shops.shopsDelete);

router.post("/:id/favorite", auth.authenticate, shops.shopsFavorite);

router.delete("/:id/favorite", auth.authenticate, shops.shopsUnFavorite);

export default router;
