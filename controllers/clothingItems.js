const { INTERNAL_SERVER_ERROR_STATUS, CREATED_STATUS, NO_CONTENT_STATUS } = require("../utils/errors");


const getClothingItems = (req, res) => {
  clothingItems
    .find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message }));
};

const deleteClothingItem = (req, res) => {
  clothingItem
    .findByIdAndDelete(req.params.itemId)
    .then(() => res.status(NO_CONTENT_STATUS).send())
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS).send(item))
    .catch((err) => res.status(INTERNAL_SERVER_ERROR_STATUS).send({ message: err.message }));
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
};
