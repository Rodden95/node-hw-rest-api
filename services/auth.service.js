const { User } = require("../models/authModel");
const bcrypt = require("bcryptjs");
// const Err = require("../error");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const { SECRET_KEY } = process.env;

const registerUser = async (userData) => {
  const user = await User.findOne({ email: userData.email });
  // console.log(user);
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
    throw Error();
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
const currentUserFind = async (id) => {
  const user = await User.findById(id);
  return user;
};
// const generateToken = (payload) => {
//   return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
// };

const authorizationUser = async (token) => {
  // console.log(token);
  try {
    const payload = jwt.verify(token, SECRET_KEY);
    // return token;
    // console.log("payload", payload);
    const { id } = payload;
    // console.log(User.findById(id));
    // console.log("ok");
    return await User.findById(id);
  } catch (error) {
    // console.log("cheto");
    return null;
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  authorizationUser,
  currentUserFind,
};
