const authService = require("../services");
const registerUser = async (req, res, next) => {
  console.log(123);
  try {
    const user = await authService.registerUser(req.body);
    // console.log(user);
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
    res
      .status(400)
      .json({ message: "Ошибка от Joi или другой библиотеки валидации" });
    // next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const token = await authService.loginUser(req.body);
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
    const { _id } = req.user;
    const { email, subscription } = await authService.currentUserFind(_id);
    res.json({ email: email, subscription: subscription });
  } catch (error) {
    next();
  }
};
module.exports = { registerUser, loginUser, logoutUser, currentUser };
