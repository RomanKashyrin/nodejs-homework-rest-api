const express = require("express");
const router = express.Router();

const { users } = require("../../controllers");
const { schema } = require("../../models/usersModel");
const { validation, auth } = require("../../middlewares");

router.get("/logout", auth, users.logout);

router.get("/current", auth, users.getUser);

router.post("/login", validation(schema.schemaLogin), users.login);

router.post("/register", validation(schema.schemaRegister), users.registration);

router.patch("/", validation(schema.schemaUpdate), auth, users.updateUser);

module.exports = router;
