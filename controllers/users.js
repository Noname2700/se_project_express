const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const { JWT_SECRET } = require("../utils/config");
const { CREATED_STATUS, OK_STATUS } = require("../utils/statusCodes");
const { BadRequestError, ConflictError, NotFoundError, UnAuthorizedError, InternalServerError } = require("../middlewares/error-handler");

const createUser = (req, res, next) => {
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
        return next(new BadRequestError("Invalid data provided for creating user"));
      }
      if (error.code === 11000) {
        return next(new ConflictError("Email already exists"));
      }
      return next(new InternalServerError("An error has occurred on the server"));
    });
};

const logInUser = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
   return next(new BadRequestError("Email and password are required"));
  }

  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.status(OK_STATUS).send({ token });
    })
    .catch(() => next(new UnAuthorizedError("Invalid email or password")));
};

const getCurrentUser = (req, res, next) => {
  const userId = req.user._id;

  User.findById(userId)
    .orFail()
    .then((user) => res.send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      return next(new InternalServerError("An error has occurred on the server"));
    });
};

const updateProfile = (req, res, next) => {
  const userId = req.user._id;
  const { name, avatar } = req.body;

  const updates = {};
  if (name !== undefined) updates.name = name;
  if (avatar !== undefined) updates.avatar = avatar;

  if (Object.keys(updates).length === 0) {
   return next(new BadRequestError("No data provided for updating profile"));
  }

  return User.findByIdAndUpdate(userId, updates, {
    new: true,
    runValidators: true,
  })
    .orFail()
    .then((user) => res.status(OK_STATUS).send(user))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("User not found"));
      }
      if (error.name === "ValidationError") {
        return next(new BadRequestError("Invalid data provided for updating profile"));
      }
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid user ID"));
      }
      return next(new InternalServerError("An error has occurred on the server"));
    });
};

module.exports = {
  createUser,
  getCurrentUser,
  logInUser,
  updateProfile,
};
