const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const {
  schemaLogin,
  schemaSignup,
  schemaResend,
} = require("../../models/authModel");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
  resend,
  confirm,
} = require("../../controllers/authController");

const { auth } = require("../../middlewares/authMDW");

const upload = require("../../middlewares/upload");
const imageService = require("../../services/image.service");
const { updateUser } = require("../../services");

router.post("/signup", validate(schemaSignup), registerUser);
router.post("/login", validate(schemaLogin), loginUser);
router.get("/logout", auth, logoutUser);
router.get("/current", auth, currentUser);

router.patch(
  "/avatars",
  auth,
  upload.single("avatar"),
  async (req, res, next) => {
    const { _id: id } = req.user;
    if (req.file) {
      const avatarUrl = await imageService(id, req.file);

      await updateUser(id, { avatarUrl });
      res.json({
        avatarUrl: `http://localhost:${process.env.PORT}/${avatarUrl}`,
      });
    } else {
      res.status(204).json({ message: "No content" });
    }
  }
);

router.get("/verify/:verificationToken", confirm);
router.post("/verify", validate(schemaResend), resend);

module.exports = router;
