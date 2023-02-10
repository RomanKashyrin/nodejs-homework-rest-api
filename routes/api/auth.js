const express = require("express");
const router = express.Router();

const { users } = require("../../controllers");
const { schemas } = require("../../models/usersModel");
const { validation, auth } = require("../../middlewares");

router.get("/logout", auth, users.logout);

router.get("/current", auth, users.getUser);

router.post("/login", validation(schemas.schemaLogin), users.login);

router.post("/register", validation(schemas.schemaRegister), users.registration);

router.patch("/", validation(schemas.schemaUpdate), auth, users.updateUser);

module.exports = router;
