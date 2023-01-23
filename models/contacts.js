const fs = require("fs/promises");
const path = require("path");
const uuid = require("uuid");

const contactPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath);
  const contacts = JSON.parse(data.toString());
  return contacts;
};

const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => {
    return contact.id === contactId;
  });
  return contact;
};

const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  const deleteContact = contacts[index];
  if (index.id === -1) {
    return null;
  }

  contacts.splice(index, 1);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return deleteContact;
};

const addContact = async (body) => {
  const { name, email, phone } = body;
  const newContact = {
    id: uuid.v4(),
    name: name,
    email: email,
    phone: phone,
  };

  const contacts = await listContacts();
  contacts.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contacts));
  return newContact;
};

const updateContact = async (contactId, body) => {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index.id === -1) {
    return null;
  }

  const contact = getContactById(contactId);
  contacts[index] = { ...contact, ...body };
  await fs.writeFile(contactPath, JSON.stringify(contacts));
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
