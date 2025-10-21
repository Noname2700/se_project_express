const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routes = require("./routes");
const { logInUser, createUser } = require("./controllers/users");

const app = express();
const { port = 3001 } = process.env;

mongoose
  .connect("mongodb://localhost:27017/wtwr_db")
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "WTWR API is running!" });
});

app.post("/signin", logInUser);
app.post("/signup", createUser);

app.use("/", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const { statusCode = 500, message = "An error occurred on the server" } = err;
  res.status(statusCode).json({ message });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
