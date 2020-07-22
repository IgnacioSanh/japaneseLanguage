const express = require("express");
const router = express.Router();

router.get("/role", (req, res) => {
  console.log("Error route role");

  return res.json({ error: "You need permisions" });
});

module.exports = router;
