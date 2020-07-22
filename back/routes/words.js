const express = require("express");
const router = express.Router();
const { Word } = require("../models/word");
const config = require("../config/key");

//Get all
router.get("/", async (req, res) => {
  const words = await Word.find();
  return res.json(words);
});

//Get by other than id
router.get("/find", async (req, res) => {
  const { searchType } = req.body;
  let words = await Word.find(searchType);
  return res.json(words);
});

//Get the word array for practice
router.get("/practice/:userId", async (req, res) => {
  const userId = req.params.userId;
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
router.post("/", async (req, res) => {
  const word = req.body;
  const modelWord = new Word(word);
  const retWord = await modelWord.save();
  console.log("Saved word: ", retWord);
  res.json({ word: modelWord, result: "OK" });
});

//Add word
/*
router.post("/", async (req, res) => {
  const { word: bodyWord } = req.body;
  if (!bodyWord)
    return res.json({ result: "error", error: "You need to add a word" });
  try {
    const word = new Word(bodyWord);
    await word.save();
    res.json({ result: "Ok", id: word._id });
  } catch ({ errors }) {
    const keys = Object.keys(errors);
    let errObj = [];
    keys.map((key) => {
      const { message } = errors[key];
      errObj.push(message);
    });
    return res.json({ result: "error", error: errObj });
  }
  return res.json({ result: "Ok" });
});
*/

router.delete("/:id", async (req, res) => {
  const id = req.params.id;
  const result = await Word.deleteOne({ _id: id });
  res.json({ result });
});

module.exports = router;
