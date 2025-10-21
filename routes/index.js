const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NOT_FOUND_STATUS } = require("../utils/errors");
const { logInUser, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", logInUser);
router.post("/signup", createUser);

router.use((req, res) => {
  res
    .status(NOT_FOUND_STATUS)
    .json({ message: "Requested resource not found" });
});

module.exports = router;
