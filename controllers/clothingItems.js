const ClothingItem = require("../models/clothingItem");
const {
  OK_STATUS,
  INTERNAL_SERVER_ERROR_STATUS,
  CREATED_STATUS,
  NOT_FOUND_STATUS,
  BAD_REQUEST_STATUS,
} = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .then((items) => res.send(items))
    .catch(() =>
      res
        .status(INTERNAL_SERVER_ERROR_STATUS)
        .send({ message: "An error has occurred on the server" })
    );
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) =>
      res
        .status(OK_STATUS)
        .send({ message: "Item deleted successfully", item })
    )
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      } else if (error.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid item ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS).send(item))
    .catch((error) => {
      if (error.name === "ValidationError") {
        res
          .status(BAD_REQUEST_STATUS)
          .send({ message: "Invalid data provided for creating item" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const likeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      } else if (error.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid item ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

const unlikeItem = (req, res) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      } else if (error.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid item ID" });
      } else {
        res
          .status(INTERNAL_SERVER_ERROR_STATUS)
          .send({ message: "An error has occurred on the server" });
      }
    });
};

module.exports = {
  deleteClothingItem,
  likeItem,
  unlikeItem,
  createClothingItem,
  getClothingItems,
};
