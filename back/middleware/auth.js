const { User } = require("../models/user");
const config = require("../config/key");

const auth = async (req, res, next) => {
  try {
    const token = req.header("token");
    if (!token) {
      res.status(404).json({ Error: "aaaaaahhhhh" });
      next(res);
    }
    let user = await User.findByToken(token, config.privateKey);
    if (!user) {
      return res.json({ isAuth: false, error: true });
    }
    req.user = user;
    next();
  } catch (err) {
    next(res.status(404));
  }
};

module.exports = { auth };
