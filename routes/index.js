const router = require("express").Router();
const clothingItemRouter = require("./clothingItems");
const userRouter = require("./users");
const { NotFoundError} = require("../middlewares/error-handler");
const { logInUser, createUser } = require("../controllers/users");

router.use("/users", userRouter);
router.use("/items", clothingItemRouter);
router.post("/signin", logInUser);
router.post("/signup", createUser);

router.use((req, res, next) => {
   next(new NotFoundError("Requested resource not found"));
});

module.exports = router;
