const contacts = require("../services");
const getAll = async (req, res, next) => {
  try {
    res.json(await contacts.listContacts());
  } catch (e) {
    next(e);
  }
};

const getById = async (req, res, next) => {
  const { contactId } = req.params;

  try {
    const product = await contacts.getContactById(contactId);
    !product
      ? res.status(404).json({ message: "Not found" })
      : res.json(product);
  } catch (e) {
    next(e);
  }
};
const create = async (req, res, next) => {
  try {
    const all = await contacts.addContact(req.body);
    res.status(201).json(all);
  } catch (e) {
    next(e);
  }
};

const deleteById = async (req, res, next) => {
  const { contactId } = req.params;
  const prod = await contacts.removeContact(contactId);
  console.log(prod);
  if (!prod) {
    res.status(400).json({ message: "Not found" });
  } else {
    res.json({ message: "contact deleted" });
  }
};

const updateContact = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const contact = await contacts.updateContact(contactId, req.body);
    if (!contact) {
      res.status(404).json({ message: "Not Found" });
    } else {
      res.json(contact);
    }
  } catch (e) {
    next(e);
  }
};
const updateFavorite = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updatedContact = await contacts.updateContact(contactId, req.body);

    if (!updatedContact) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(updatedContact);
    }
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  updateContact,
  updateFavorite,
  deleteById,
};
