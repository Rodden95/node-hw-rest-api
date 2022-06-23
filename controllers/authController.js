const authService = require("../services");
const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);
    if (user) {
      res.status(409).json({
        message: "Email in use",
      });
    }
    res.status(201).json({
      email: req.body.email,
      subscription: "starter",
    });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
    console.log(token);
    res.json({
      token: token,
      user: {
        email: req.body.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    res.status(401).json({ message: "Email or password is wrong" });
  }
};
const logoutUser = async (req, res, next) => {
  try {
    const { _id } = req.user;
    await authService.logoutUser(_id);
    res.sendStatus(204);
  } catch (error) {
    next(error);
  }
};
const currentUser = async (req, res, next) => {
  try {
    const { token } = req.user;
    const { email, subscription } = await authService.authorizationUser(token);
    res.json({ email: email, subscription: subscription });
  } catch (error) {
    next();
  }
};
module.exports = { registerUser, loginUser, logoutUser, currentUser };
