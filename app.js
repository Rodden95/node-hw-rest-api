const express = require("express");
const logger = require("morgan");
const cors = require("cors");
const { auth } = require("./middlewares/authMDW");
const contactsRouter = require("./routes/api/contacts");
const authRoute = require("./routes/api/authRoute");
const app = express();

app.use(logger("dev"), cors(), express.json());
app.use(express.static("public"));
app.use("/api/contacts", auth, contactsRouter);
app.use("/api/users", authRoute);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, req, res) => {
  console.log(123);
  res.status(500).json({ message: err.message });
});

module.exports = app;
