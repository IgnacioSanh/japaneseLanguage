const express = require("express");
const router = express.Router();
const config = require("../config/key");
const { auth } = require("../middleware/auth");
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

router.get("/", auth, async (req, res) => {
  const users = await User.find().select("-password -token");
  return res.json(users);
});

router.post("/register", async (req, res) => {
  try {
    const user = new User(req.body);
    //Check if email is registered
    const users = await User.find({ email: user.email });
    if (users.length > 0) {
      return res.json({
        error: {
          email: "The email is already in use",
        },
      });
    }
    await user.save();
    return res.json({
      user: { firstname: user.firstname, email: user.email },
    });
  } catch (err) {
    console.log("Error in register", err.errmsg);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  //Find email
  let user = await User.findOne({ email: email });
  if (!user)
    return res.json({
      loggedIn: false,
      error: {
        email: "The entered email is not registered",
      },
    });
  //Compare password
  let match = await user.comparePassword(password);
  if (!match)
    return res.json({
      loggedIn: false,
      error: {
        password: "Wrong password",
      },
    });
  //Save Token
  await user.saveToken(config.privateKey);
  return res.json({
    LoggedIn: true,
    token: user.token,
    user: { firstname: user.firstname, email: user.email },
  });
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
