const express = require("express");
const router = express.Router();

const { user } = require("../../controllers/authController");
const { schema } = require("../../models/usersModel");
const { validation, auth } = require("../../middlewares");


router.get("/logout", auth, user.logout);

router.get("/current", auth, user.getUser);

router.post("/login", validation(schema.schemaLogin), user.login);

router.post("/register", validation(schema.schemaRegister), user.registration);

router.patch("/", validation(schema.schemaUpdate), auth, user.updateUser);

module.exports = router;
