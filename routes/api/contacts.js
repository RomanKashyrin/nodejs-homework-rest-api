const express = require("express");
const router = express.Router();

const { contacts }  = require("../../controllers");
const { schemas }  = require("../../models/contactsModel");
const { validation, auth } = require("../../middlewares");

router.get("/", auth, contacts.getContact);

router.get("/:contactId", auth, contacts.contactById);

router.post(
  "/",
  validation(schemas.schemaAddContact),
  auth,
  contacts.createContact
);

router.put(
  "/:contactId",
  validation(schemas.schemaUpdateContact),
  auth,
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validation(schemas.schemaUpdateStatus),
  auth,
  contacts.updateContact
);

router.delete("/:contactId", auth, contacts.deleteContact);

module.exports = router;
