const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { schemaLogin, schemaSignup } = require("../../models/authModel");
const {
  registerUser,
  loginUser,
  logoutUser,
} = require("../../controllers/authController");

const { auth } = require("../../middlewares/authMDW");

router.post(
  "/signup",
  validate(schemaSignup, "Ошибка от Joi или другой библиотеки валидации"),
  registerUser
);
router.post("/login", validate(schemaLogin), loginUser);
router.post("/logout", auth, logoutUser);

module.exports = router;
