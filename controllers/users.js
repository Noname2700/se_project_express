const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  CREATED_STATUS,
  CONFLICT_STATUS,
  OK_STATUS,
  UNAUTHORIZED_STATUS,
} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .send({ message: "An error has occurred on the server" })
    );
};

const createUser = (req, res) => {
  const { name, avatar, email, password } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({ name, avatar, email, password: hash }))
    .then((user) => {
      const userResponse = user.toObject();
      delete userResponse.password;
      res.status(CREATED_STATUS).send(userResponse);
    })
    .catch((error) => {
      if (error.name === "ValidationError") {
        res.status(BAD_REQUEST_STATUS).send({
          message: "Invalid data provided for creating user",
        });
      } else if (error.code === 11000) {
        res.status(CONFLICT_STATUS).send({
          message: "Email already exists",
        });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({
          message: "An error has occurred on the server",
        });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send({ message: "User not found" });
      }
      if (error.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .send({ message: "An error has occurred on the server" });
    });
};

const logInUser = (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res
      .status(BAD_REQUEST_STATUS)
      .send({ message: "Email and password are required" });
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(OK_STATUS).send({ token });
    })
    .catch(() => {
      res
        .status(UNAUTHORIZED_STATUS)
        .send({ message: "Incorrect email or password" });
    });
};

const getCurrentUser = (req, res) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send({ message: "User not found" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .send({ message: "An error has occurred on the server" });
    });
};

const updateProfile = (req, res) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (avatar !== undefined) updates.avatar = avatar;

  if (Object.keys(updates).length === 0) {
    return res
      .status(BAD_REQUEST_STATUS)
      .send({ message: "At least one field must be provided for update" });
  }

  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return res.status(NOT_FOUND_STATUS).send({ message: "User not found" });
      }
      if (error.name === "ValidationError") {
        return res.status(BAD_REQUEST_STATUS).send({
          message: "Invalid data provided for updating profile",
        });
      }
      if (error.name === "CastError") {
        return res
          .status(BAD_REQUEST_STATUS)
          .send({ message: "Invalid user ID" });
      }
      return res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .send({ message: "An error has occurred on the server" });
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  getCurrentUser,
  logInUser,
  updateProfile,
};
