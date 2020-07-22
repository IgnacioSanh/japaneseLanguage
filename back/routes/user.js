const express = require("express");
const router = express.Router();
const config = require("../config/key");
const { auth, auth2 } = require("../middleware/auth");
const { User } = require("../models/user");

router.get("/auth", (req, res) => {
  if (!req.token) return res.status(200).json({ error: "Token was not found" });
  const user = {
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
  };
  return res.json(user);
});

router.get("/", auth2, async (req, res) => {
  console.log("Users");
  const users = await User.find().select("-password -token");
  return res.json(users);
});

router.post("/register", async (req, res) => {
  const user = new User(req.body);
  await user.save(user);
  return res.json({ successful: true });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Find email
  let user = await User.findOne({ email: email });
  if (!user)
    return res.json({
      loggedIn: false,
      error: "The entered mail does not exist",
    });
  //Compare password
  let match = await user.comparePassword(password);
  if (!match)
    return res.json({
      loggedIn: false,
      error: "The password is not correct",
    });
  //Save Token
  user = await user.saveToken(config.privateKey);
  if (!user)
    return res.json({ loggedIn: false, error: "Something went wrong" });

  return res
    .cookie("x-auth", user.token)
    .json({ LoggedIn: true, token: user.token });
});

router.get("/logout", auth, async (req, res) => {
  try {
    await User.findOneAndUpdate({ _id: req.user._id }, { token: "" });
    return res.status(200).json({ LoggedOut: true });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ LoggedOut: false, Error: error });
  }
});

module.exports = router;
