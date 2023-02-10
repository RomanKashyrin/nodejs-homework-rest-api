const { Contact } = require("../models/contactsModel");
const { User } = require("../models/usersModel");

const getContact = async (userId, query) => {
  const { page = 1, limit = 20, favorite } = query;
  const skip = (page - 1) * limit;
  if (favorite) {
    return Contact.find({ owner: userId, favorite: favorite }, "", {
      skip,
      limit: +limit,
    });
  }
};

const getContactById = async (id, userId) => {
  return Contact.findById({ _id: id, owner: userId });
};

const addContact = async (body) => {
  return Contact.create(body);
};

const updateContact = async (_id, contactId, ...body) => {
  return Contact.findByIdAndUpdate({
    _id: contactId,
    owner: _id,
    body,
    new: true,
  });
};

const updateStatusContact = async (id, userId, body) => {
  return Contact.findByIdAndUpdate(
    { _id: id, owner: userId },
    { $set: { favorite: body } },
    { new: true }
  );
};

const deleteContact = async (id, userId) => {
  return Contact.findByIdAndRemove({ _id: id, owner: userId });
};

module.exports = {
  getContact,
  getContactById,
  addContact,
  updateContact,
  updateStatusContact,
  deleteContact,
};
