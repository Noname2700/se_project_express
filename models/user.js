const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  avatar: {
    type: String,
    required: true,
    URL: true,
  },
});
