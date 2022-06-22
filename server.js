const app = require("./app");
const mongoose = require("mongoose");

require("dotenv").config();

const { PORT, DB_HOST } = process.env;
mongoose
  .connect(DB_HOST)
  .then(() => {
    app.listen(PORT);
  })
  .then(() => {
    console.log("Database connection successful");
  })
  .catch((e) => {
    console.log(e);
    process.exit(1);
  });
