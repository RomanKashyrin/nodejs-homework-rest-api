const { Contact } = require("../models/contactsModel");

const getContact = async () => {
  return Contact.find();
};

const getContactById = async (id) => {
  return Contact.findById({ _id: id });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (id, body) => {
  return Contact.findByIdAndUpdate({ _id: id }, body, { new: true });
};

const updateStatusContact = async (id, body) => {
  return Contact.findByIdAndUpdate(
    { _id: id },
    { $set: { favorite: body } },
    { new: true }
  );
};

const deleteContact = async (id) => {
  return Contact.findByIdAndRemove({ _id: id });
};

module.exports = {
  getContact,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
