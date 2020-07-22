const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxlength: 50,
  },
  email: {
    type: String,
    trim: true,
    unique: 1,
  },
  password: {
    type: String,
    minlength: 5,
  },
  lastname: {
    type: String,
    maxlength: 50,
  },
  role: {
    type: Number,
    default: 0, //Normal user
  },
  token: {
    type: String,
  },
  tokenExpiration: {
    type: Number,
  },
});

const saltRounds = 10;

userSchema.pre("save", function (next) {
  let user = this;
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        return next();
      });
    });
  } else return next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.saveToken = async function (privateKey) {
  const payload = { _id: this._id };
  const token = await jwt.sign(payload, privateKey, { expiresIn: "2h" });
  this.token = token;
  return await this.save();
};

userSchema.statics.findByToken = async function (token, privateKey) {
  let tokenId = await jwt.verify(token, privateKey);
  const user = await this.findOne({ _id: tokenId });
  return user;
};

const User = mongoose.model("User", userSchema);

module.exports = { User };
