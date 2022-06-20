const express = require("express");
const router = express.Router();
const validate = require("../../middlewares/validate");

const { auth } = require("../../middlewares/authMDW");

const { schemaCreate, schemaPatch } = require("../../models/contacts");
const {
  getAll,
  getById,
  create,
  updateContact,
  updateFavorite,
  deleteById,
} = require("../../controllers/contactsControllers");


router.get("/", auth, getAll);

router.get("/:contactId", getById);

router.post(
  "/",
  validate(schemaCreate, "missing required name field"),
  auth,
  create
);


router.delete("/:contactId", deleteById);

router.put(
  "/:contactId",
  validate(schemaCreate, "missing fields"),
  updateContact
);

router.patch(
  "/:contactId/favorite",
  validate(schemaPatch, "missing field favorite"),
  updateFavorite
);

module.exports = router;
