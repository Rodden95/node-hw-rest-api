const { User } = require("../models/authModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const err = require("../error");
require("dotenv").config();
const { v4 } = require("uuid");
const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  if (user) {
    throw err(409, "Email in use");
  }
  const hashedPassword = await bcrypt.hash(userData.password, 10);

  return await User.create({
    ...userData,
    password: hashedPassword,
    verificationToken: v4(),
  });
};

const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (user && !user.verify) {
    throw err(404, "User email is not verified");
  }
  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    throw err(401, "Email or password is wrong");
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

const updateUser = (id, data) =>
  User.findByIdAndUpdate(id, data, { new: true });

const findUser = async (filters) => User.findOne(filters);

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authorizationUser,
  findUser,
  updateUser,
};
