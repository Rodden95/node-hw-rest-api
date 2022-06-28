const authService = require("../services/auth.service");
const emailService = require("../services/email.service");

const registerUser = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body);

    await emailService.sendEmail(user.email, user.verificationToken);

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

    res.json({
      token: token,
      user: {
        email: req.body.email,
        subscription: "starter",
      },
    });
  } catch (error) {
    console.log("erererererererere");
    next(error);
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
const confirm = async (req, res, next) => {
  try {
   
    const { verificationToken } = req.params;
    const user = await authService.findUser({ verificationToken });
 
    if (!user) {
      res.status(404).json({ message: "Not found" });
    }

    await authService.updateUser(user._id, {
      verify: true,
      verificationToken: null,
    });

    res.status(200).json({
      code: 200,
      message: "Verification successful",
    });
  } catch (error) {
    
    next(error);
  }
};
const resend = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await authService.findUser({ email });

    if (!user) {
      res.status(404).json({ message: "Not found" });
     
    }
    if (!user.verificationToken) {
      res.status(401).json({ message: "Verification has already been passed" });
    }
    await emailService.sendEmail(user.email, user.verificationToken);

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};
module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  resend,
  confirm,
};
