const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

require("./startup/db")();
require("./startup/routes")(app);

console.log("Listening on port 5000");

app.listen(5000);
