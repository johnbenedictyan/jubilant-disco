import { Router } from "express";

import {
    usersGet,
    usersList,
    usersLogin,
    usersRegister,
    usersUpdate,
} from "../../controllers/usersController";
import * as auth from "../../middleware/auth/authenticator";
import * as validator from "../../middleware/userValidator";

const router = Router();

router.get("/", usersList);

router.get("/profile", usersGet);

router.put(
  "/",
  auth.optionalAuthenticate,
  validator.userUpdateValidator,
  usersUpdate
);

router.post("/login", validator.userLoginValidator, usersLogin);

router.post("/register", validator.userRegisterValidator, usersRegister);

export default router;
