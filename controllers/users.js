const getUsers = (req, res) => {
  Users.find({})
  .then((users) => res.send(users))
  .catch((err) => res.status(500).send({ message: err.message }));
}

const createUser = (req, res) => {
const { name, avatar } = req.body;
User.create({ name, avatar })
  .then((user) => res.send(user))
  .catch((err) => {
    if (err.name === 'ValidationError') {
      res.status(400).send({ message: err.message });
    } else {
      res.status(500).send({ message: err.message });
    }
  });
}
const getUser = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => res.send(user))
    .catch((err) => res.status(500).send({ message: err.message }));
}

module.exports = {
  getUsers,
  createUser,
  getUser,
};