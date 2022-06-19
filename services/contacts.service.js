const { Contact } = require("../models/contacts");

const listContacts = async () => {
  // const { page, limit } = query;
  // const skipped = (page - 1) * limit;
  // const skip = skipped < 0 ? 0 : skipped;
  // // console.log(skip);
  // return Product.find({}, {}, { skip, limit: Number(limit) }).populate(
  //   "createdBy",
  //   "name role"
  // );

  return Contact.find();
};

const getContactById = async (contactId) => Contact.findById(contactId);

const removeContact = async (contactId) => Contact.findByIdAndDelete(contactId);

const addContact = async (contact) => Contact.create(contact);

const updateContact = async (contactId, contact) =>
  Contact.findByIdAndUpdate(contactId, contact, { new: true });

const updateFavorite = async (contactId, contact) =>
  Contact.findByIdAndUpdate(contactId, contact, { new: true });
module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,
};
