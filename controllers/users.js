const User = require("../models/user");
const {
  BAD_REQUEST_STATUS,
  NOT_FOUND_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  CREATED_STATUS,
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
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.status(CREATED_STATUS).send(user))
    .catch(() => {
      if (err.name === "ValidationError") {
        res
          .status(BAD_REQUEST_STATUS)
          .send({ message: "Invalid data provided for creating user" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch(() => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "User not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid user ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  getUsers,
  createUser,
  getUser,
};
