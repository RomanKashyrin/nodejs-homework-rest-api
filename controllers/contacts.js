const service = require("../service/contactsService");
const createError = require("http-errors");

const getContact = async (req, res) => {
  const result = await service.getContact();
  res.json(result);
};

const contactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.getContactById(contactId);
  if (!result) {
    return next(createError(400, "Not found"));
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const result = await service.addContact(req.body);
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.updateContact(contactId, req.body);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const result = await service.updateStatusContact(contactId, favorite);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await service.deleteContact(contactId);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

module.exports = {
  getContact,
  contactById,
  createContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
