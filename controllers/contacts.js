const operation = require("../models/contacts");
const createError = require("http-errors");

const getContact = async (req, res) => {
  const result = await operation.listContacts();
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const contactById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operation.getContactById(contactId);
  if (!result) {
    return next(createError(400, "Not found"));
  }
  res.json({
    status: "success",
    code: 200,
    data: {
      result,
    },
  });
};

const createContact = async (req, res) => {
  const result = await operation.addContact(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    message: "Contact added",
    data: {
      result,
    },
  });
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operation.removeContact(contactId);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json({
    status: "success",
    code: 200,
    message: "Contact deleted",
  });
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await operation.updateContact(contactId, req.body);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json({
    status: "success",
    code: 200,
    message: "Update contact",
    data: {
      result,
    },
  });
};

module.exports = {
  getContact,
  contactById,
  createContact,
  deleteContact,
  updateContact,
};
