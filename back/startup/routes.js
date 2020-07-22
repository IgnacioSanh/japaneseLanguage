// const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const user = require("../routes/user");
const error = require("../routes/error");
const words = require("../routes/words");

module.exports = function (app) {
  //Utilities to use
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());

  app.use("/api/user", user);
  app.use("/api/error", error);
  app.use("/api/word", words);
};
