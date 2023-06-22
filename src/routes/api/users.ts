import { Router } from "express";

import {
  usersGet,
  usersLogin,
  usersRegister,
  usersUpdate,
} from "../../controllers/usersController";
import { authenticate } from "../../middleware/auth/authenticator";
import * as validator from "../../middleware/userValidator";

const router = Router();

router.post("/login", validator.userLoginValidator, usersLogin);

router.post("/", validator.userRegisterValidator, usersRegister);

router.get("/", authenticate, usersGet);

router.put("/", authenticate, validator.userUpdateValidator, usersUpdate);

export default router;
