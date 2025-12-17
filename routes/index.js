const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const NotFoundError = require("../middlewares/errors/notFoundError");
const { logInUser, createUser } = require("../controllers/users");
const {
  authenticateUser,
  validateUserCreation,
} = require("../middlewares/validation");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", authenticateUser, logInUser);
router.post("/signup", validateUserCreation, createUser);

router.use((req, res, next) => {
  next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
