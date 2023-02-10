const express = require("express");
const router = express.Router();

const { contacts }  = require("../../controllers");
const { schema }  = require("../../models/contactsModel");
const { validation, auth } = require("../../middlewares");
// const { validation } = require("../../middlewares/validation");
// const { auth } = require("../../middlewares/auth");

router.get("/", auth, contacts.getContact);

router.get("/:contactId", auth, contacts.contactById);

router.post(
  "/",
  validation(schema.schemaAddContact),
  auth,
  contacts.createContact
);

router.put(
  "/:contactId",
  validation(schema.schemaUpdateContact),
  auth,
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validation(schema.schemaUpdateStatus),
  auth,
  contacts.updateContact
);

router.delete("/:contactId", auth, contacts.deleteContact);

module.exports = router;
