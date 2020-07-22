const { User } = require("../models/user");
const config = require("../config/key");

const auth = async (req, res, next) => {
  try {
    let token = req.get("x-auth");
    if (!token) return next();
    let user = await User.findByToken(token, config.privateKey);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.user = user;
    next();
  } catch (err) {
    console.log("The token was not found");
    next();
  }
};

const auth2 = async (req, res, next) => {
  try {
    const token = req.get("x-auth");
    console.log("Auth2", token);
    if (!token) {
      console.log("Auth2", "Redirecting to role error");
      // res.status(300).json({ error: "User not logged in" });
      res.redirect("/api/error/role");
    }
    next();
  } catch (err) {
    console.log("There was an error founding the token");
    next();
  }
};

module.exports = { auth, auth2 };
