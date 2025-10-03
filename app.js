const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");

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

app.use((req, res, next) => {
  req.user = {
    _id: "507f1f77bcf86cd799439011", // Temporary user ID
  };
  next();
});

app.get("/", (req, res) => {
  res.json({ message: "WTWR API is running!" });
});

app.use("/", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  const { statusCode = 500, message = "An error occurred on the server" } = err;
  res.status(statusCode).json({ message });
});


app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
