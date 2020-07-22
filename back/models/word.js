const mongoose = require("mongoose");

const wordSchema = mongoose.Schema({
  original: {
    type: String,
    required: [true, "The original word is required"],
  },
  meaning: {
    type: String,
    required: [true, "The translation is required"],
  },
  knowledge: {
    type: Number,
    default: 0,
  },
  userId: {
    type: mongoose.ObjectId,
  },
});

const Word = mongoose.model("Word", wordSchema);

module.exports = { Word };
