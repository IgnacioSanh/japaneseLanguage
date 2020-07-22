const mongoose = require("mongoose");
const config = require("../config/key");

module.exports = async function () {
  try {
    await mongoose.connect(config.mongoURI, { useNewUrlParser: true });
    console.log(
      "%c 🍃 Connected to mongoDB",
      "color: white; background-color: black;"
    );
  } catch (err) {
    console.log("Error connecting to mongo: ", err);
  }
};
