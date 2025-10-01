const User = require("../models/user");
const {BAD_REQUEST_STATUS, NOT_FOUND_STATUS, INTERNAL_SERVER_ERROR_STATUS} = require("../utils/errors");

const getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message }));
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_STATUS).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message });
      }
    });
};
const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid user ID" });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
