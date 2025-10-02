const ClothingItem = require("../models/clothingItem");
const {
  INTERNAL_SERVER_ERROR_STATUS,
  CREATED_STATUS,
  NO_CONTENT_STATUS,
  NOT_FOUND_STATUS,
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
    .then(() => res.status(NO_CONTENT_STATUS).send())
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message })
    );
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id; 

  ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS).send(item))
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message })
    );
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
    .then((item) => {
      if (!item) {
        return res.status(NOT_FOUND_STATUS).send({ message: "Item not found" });
      }
      return res.send(item);
    })
    .catch((err) =>
      res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message })
    );
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
  updateClothingItem,
};
