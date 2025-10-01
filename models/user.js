const mongoose = require("mongoose");
import isURL from "validator/es/lib/isURL.js";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The Avatar field is required"],
    validate: { validator: (value) => isURL(value), message: "Invalid URL" },
  },
});

module.exports = mongoose.model("user", userSchema);
