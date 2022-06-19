const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const err = require("../../error");
const { schemaLogin, schemaSignup } = require("../../models/authModel");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
} = require("../../controllers/authController");

const { auth } = require("../../middlewares/authMDW");

router.post(
  "/signup",
  validate(schemaSignup, "Ошибка от Joi или другой библиотеки валидации"),
  registerUser
);
router.post("/login", validate(schemaLogin), loginUser);
router.get("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);
module.exports = router;
