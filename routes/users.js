const router = require("express").Router();
const {
  getUsers,
  createUser,
  getUser,
} = require("../controllers/users");

router.get("/users", getUsers);
router.post("/users", createUser);
router.get("/users/:userId", getUser);

module.exports = router;
