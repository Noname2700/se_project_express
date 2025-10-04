const router = require("express").Router();

const {
  getClothingItems,
  createClothingItem,
  deleteClothingItem,
  likeItem,
  unlikeItem,

} = require("../controllers/clothingItems");

router.get("/", getClothingItems);
router.post("/", createClothingItem);
router.delete("/:itemId", deleteClothingItem);
router.put("/:itemId", likeItem);
router.delete("/:itemId/unlike", unlikeItem);

module.exports = router;
