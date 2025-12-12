const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const fs = require("fs");
const path = require("path");
const { errors } = require("celebrate");
const routes = require("./routes");
const { errorHandler } = require("./middlewares/error-handler");
const { requestLogger, errorLogger } = require("./middlewares/logger");
require("dotenv").config();

// Create logs directory if it doesn't exist
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

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

app.use(requestLogger);
app.use("/", routes);
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
