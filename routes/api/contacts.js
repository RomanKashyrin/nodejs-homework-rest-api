const express = require("express");
const router = express.Router();

const { contacts } = require("../../controllers");
const  schema   = require("../../models/contactsModel");
const { validation } = require("../../middlewares");

router.get("/", contacts.getContact);

router.get("/:contactId", contacts.contactById);

router.post("/", validation(schema.schemaAddContact), contacts.createContact);

router.put(
  "/:contactId",
  validation(schema.schemaUpdateContact),
  contacts.updateContact
);

router.patch(
  "/:contactId/favorite",
  validation(schema.schemaUpdateStatus),
  contacts.updateContact
);

router.delete("/:contactId", contacts.deleteContact);

module.exports = router;
