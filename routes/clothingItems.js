const router = require("express").Router();
const auth = require("../middlewares/auth");

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,
} = require("../controllers/clothingItems");
const {
  validateClothingItemCreation,
  validateItemIdParam,
} = require("../middlewares/validation");

router.get("/", getClothingItems);

router.post("/", auth, validateClothingItemCreation, createClothingItem);
router.delete("/:itemId", auth, validateItemIdParam, deleteClothingItem);
router.put("/:itemId/likes", auth, validateItemIdParam, likeItem);
router.delete("/:itemId/likes", auth, validateItemIdParam, unlikeItem);

module.exports = router;
