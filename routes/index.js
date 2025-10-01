const router = require("express").Router();
const clothingItem = require("./clothingItems");

router.use("/items", clothingItem);

module.exports = router;