const getClothingItems = (req, res) => {
  clothingItems
    .find({})
    .then((items) => res.send(items))
    .catch((err) => res.status(500).send({ message: err.message }));
};

const deleteClothingItem = (req, res) => {
  clothingItem
    .findByIdAndDelete(req.params.itemId)
    .then(() => res.status(204).send())
    .catch((err) => res.status(500).send({ message: err.message }));
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl, owner } = req.body;
  clothingItem
    .create({ name, weather, imageUrl, owner })
    .then((item) => res.status(201).send(item))
    .catch((err) => res.status(500).send({ message: err.message }));
};

module.exports = {
  deleteClothingItem,
  createClothingItem,
  getClothingItems,
};
