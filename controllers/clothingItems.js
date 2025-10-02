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
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message })
    );
};

const deleteClothingItem = (req, res) => {
  ClothingItem.findByIdAndDelete(req.params.itemId)
    .orFail()
    .then((item) =>
      res.status(OK_STATUS).send({ message: "Item deleted successfully", item })
    )
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid item ID" });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message });
      }
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS).send(item))
    .catch((err) => {
      if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_STATUS).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message });
      }
    });
};

const updateClothingItem = (req, res) => {
  const { itemId } = req.params;
  const { name, weather, imageUrl } = req.body;

  ClothingItem.findByIdAndUpdate(
    itemId,
    { name, weather, imageUrl },
    { new: true }
  )
    .orFail()
    .then((item) => res.send(item))
    .catch((err) => {
      if (err.name === "DocumentNotFoundError") {
        res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      } else if (err.name === "CastError") {
        res.status(BAD_REQUEST_STATUS).send({ message: "Invalid item ID" });
      } else if (err.name === "ValidationError") {
        res.status(BAD_REQUEST_STATUS).send({ message: err.message });
      } else {
        res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message });
      }
    });
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  updateClothingItem,
};
