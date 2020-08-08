const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/auth");
const { Word } = require("../models/word");
const config = require("../config/key");

//Get all
router.get("/", auth, async (req, res) => {
  //Get user id from token
  const words = await Word.find({ userId: req.user._id });
  return res.json({ status: "OK", words });
});

//Get by other than id
router.get("/find", async (req, res) => {
  const { searchType } = req.body;
  let words = await Word.find(searchType);
  return res.json(words);
});

//Get the word array for practice
router.get("/practice/", auth, async (req, res) => {
  const userId = req.user._id;
  const practiceWords = await Word.find({ userId: userId, knowledge: 0 });
  res.json({ words: practiceWords });
});

//Get by Id
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const word = await Word.findById(id);
  if (!word) return res.json({ error: "The searched word does not exist" });
  return res.json(word);
});

//Add word2
router.post("/", auth, async (req, res) => {
  const { _id } = req.user;
  const word = { ...req.body, userId: _id };
  const modelWord = new Word(word);
  await modelWord.save();
  res.json({ word: modelWord, result: "OK" });
});

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Word.deleteOne({ _id: id });
  res.json({ result });
});

module.exports = router;
