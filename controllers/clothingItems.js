const ClothingItem = require("../models/clothingItem");
const { OK_STATUS, CREATED_STATUS } = require("../utils/statusCodes");

const {
  BadRequestError,
  NotFoundError,
  ForbiddenError,
  InternalServerError,
} = require("../middlewares/error-handler");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((items) => res.status(OK_STATUS).send(items))
    .catch((err) => {
      next(err);
    });
};

const deleteClothingItem = (req, res, next) => {
  ClothingItem.findById(req.params.itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== req.user._id) {
        return next(
          new ForbiddenError("You do not have permission to delete this item")
        );
      }
      return ClothingItem.findByIdAndDelete(req.params.itemId).then(() => {
        res.status(OK_STATUS).send({ message: "Item deleted successfully" });
      });
    })
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        next(new NotFoundError("Item not found"));
      } else if (error.name === "CastError") {
        next(new BadRequestError("Invalid item ID"));
      } else {
        next(error);
      }
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  const owner = req.user._id;

  if (!name || !weather || !imageUrl) {
    return next(
      new BadRequestError("Name, weather, and imageUrl are required")
    );
  }

  return ClothingItem.create({ name, weather, imageUrl, owner })
    .then((item) => res.status(CREATED_STATUS).send(item))
    .catch((error) => {
      if (error.name === "ValidationError") {
        next(new BadRequestError("Invalid data provided for creating item"));
      } else {
        next(error);
      }
    });
};

const likeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $addToSet: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(
        new InternalServerError("An error has occurred on the server")
      );
    });
};

const unlikeItem = (req, res, next) => {
  ClothingItem.findByIdAndUpdate(
    req.params.itemId,
    { $pull: { likes: req.user._id } },
    { new: true }
  )
    .orFail()
    .then((item) => res.status(OK_STATUS).send(item))
    .catch((error) => {
      if (error.name === "DocumentNotFoundError") {
        return next(new NotFoundError("Item not found"));
      }
      if (error.name === "CastError") {
        return next(new BadRequestError("Invalid item ID"));
      }
      return next(
        new InternalServerError("An error has occurred on the server")
      );
    });
};

module.exports = {
  deleteClothingItem,
  likeItem,
  unlikeItem,
  createClothingItem,
  getClothingItems,
};
