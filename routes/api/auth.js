const express = require("express");
const router = express.Router();

const { users } = require("../../controllers");
const { schemas } = require("../../models/usersModel");
const { validation, auth, upload } = require("../../middlewares");


router.get("/logout", auth, users.logout);

router.get("/current", auth, users.getUser);

router.get("/verify/:verificationToken", users.verifyEmail);

router.post("/verify", validation(schemas.SchemaVerifyEmail), users.resendVerifyEmail);

router.post("/login", validation(schemas.schemaLogin), users.login);

router.post(
  "/register",
  validation(schemas.schemaRegister),
  users.registration
);

router.patch("/", validation(schemas.schemaUpdate), auth, users.updateUser);

router.patch("/avatars", auth, upload.single("avatar"), users.updateAvatar);

module.exports = router;
