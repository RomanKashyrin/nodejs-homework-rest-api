const express = require("express");
const contacts = require("../../controllers/contacts");
const router = express.Router();

const schema = require("../../schema/contactSchema");
const validation = require("../../middlewares/validation");

router.get("/", contacts.getContact);

router.get("/:contactId", contacts.contactById);

router.post("/", validation(schema.schemaAddContact), contacts.createContact);

router.put(
  "/:contactId",
  validation(schema.schemaUpdateContact),
  contacts.updateContact
);

router.delete("/:contactId", contacts.deleteContact);

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

module.exports = router;
