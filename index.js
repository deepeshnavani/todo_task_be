const express = require("express");
require("dotenv").config();
const port = 7000 || process.env.port;
const supabase = require("./src/connection/connect");

const app = express();

app.listen(port, () => {
  console.log("Server is started!!");
});
if (supabase) console.log("Connnection is created!!");
