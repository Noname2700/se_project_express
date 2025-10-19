const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS)
    .json({ message: "Requested resource not found" });
});

module.exports = router;
