const express = require("express");
require("dotenv").config();
const cors = require("cors");
const supabase = require("./src/connection/connect");

const mainRouter = require("./src/router/route");
const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "https://todo-task-fe.vercel.app",
      "https://todo-task-fe-two.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api", mainRouter);

const port = process.env.PORT || 7000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});

if (supabase) {
  console.log("Supabase connection created!");
} else {
  console.error("Supabase connection failed!");
}

app.get("/", (req, res) => {
  res.send("Hello from vercel");
});
