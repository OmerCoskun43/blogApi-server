"use strict";
const mongoose = require("mongoose");
const MONGODB = process.env.MONGODB;

const dbConnection = function () {
  mongoose
    .connect(MONGODB)
    .then(() => {
      console.log("MongoDB connected successfully 😀😀😀");
    })
    .catch((error) => {
      console.log("MongoDB disconnection  😥😥😥 "), error;
    });
};

module.exports = {
  dbConnection,
  mongoose,
};
