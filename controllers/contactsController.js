const createError = require("http-errors");
const service = require("../service/contactsService");

const getContact = async (req, res) => {
  const { _id } = req.user;
  const result = await service.getCnt(_id, req.query);
  res.json(result);
};

const contactById = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.getCntById(contactId, _id);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

const createContact = async (req, res) => {
  const { _id } = req.user;
  const result = await service.addCnt({ ...req.body, owner: _id });
  res.status(201).json(result);
};

const updateContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.updateCnt(contactId, req.body, _id);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

const updateStatusContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { favorite } = req.body;
  const { _id } = req.user;
  const result = await service.updateStatusCnt(contactId, _id, favorite);
  if (!result) {
    return next(createError(404, "Not found"));
  }
  res.json(result);
};

const deleteContact = async (req, res, next) => {
  const { contactId } = req.params;
  const { _id } = req.user;
  const result = await service.deleteCnt(contactId, _id);
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
