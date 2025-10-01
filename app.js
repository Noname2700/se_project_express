const express = require("express");
const mongoose = require("mongoose");
const mainRouter = require("./routes/index");

const app = express();
const { port = 3001 } = process.env;

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch(() => {
    console.log(console.error);
  });

app.use(express.json());
app.use("/users", mainRouter);

app.get("/", (req, res) => {
  res.send(users);
});

app.post("/", (req, res) => {
  const { name, avatar } = req.body;
  const newUser = { id: users.length + 1, name, avatar };
  users.push(newUser);
  res.status(201).send(newUser);
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
