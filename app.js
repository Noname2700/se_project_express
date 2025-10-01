const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./routes/users");
const clothingItemRouter = require("./routes/clothingItems");

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

app.use(express.json());
app.use("/users", userRouter);
app.use("/items", clothingItemRouter);

app.get("/", (req, res) => {
  res.json({ message: "WTWR API is running!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
