const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,

} = require("./contacts.service");
const {
  registerUser,
  loginUser,
  logoutUser,
  authorizationUser,
  currentUserFind,
findUser,
  updateUser,

} = require("./auth.service");


module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateFavorite,

  registerUser,
  loginUser,
  logoutUser,
  authorizationUser,
  currentUserFind,
findUser,
  updateUser,


};
