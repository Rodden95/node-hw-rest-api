const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");
const { schemaLogin, schemaSignup } = require("../../models/authModel");
const {
  registerUser,
  loginUser,
  logoutUser,
  currentUser,
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
    const avatarUrl = await imageService(id, req.file);
    // console.log(req.file);
    await updateUser(id, { avatarUrl });
    // console.log(user.avatarURL);
    res.json({ avatarUrl: `http://localhost:8080/${avatarUrl}` });
  }
);
module.exports = router;
