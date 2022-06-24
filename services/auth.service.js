const { User } = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { loginError } = require("../error");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) {
    return user;
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  await User.create({
    ...userData,
    password: hashedPassword,
  });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw loginError();
  }

  const payload = {
    id: user._id,
    role: user.role,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  await User.findByIdAndUpdate(user._id, { token });
  return token;
};

const logoutUser = async (id) => {
  await User.findByIdAndUpdate(id, { token: null });
};

const authorizationUser = async (token) => {
  try {
    const { id } = jwt.verify(token, SECRET_KEY);
    return await User.findById(id);
  } catch (error) {
    return null;
  }
};

const updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};


module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authorizationUser,

  updateUser,

};
