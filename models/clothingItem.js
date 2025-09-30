const clothingItemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    min: 2,
    max: 30,
  },
  weather: {
    type: String,
    required: true,
    enum: ["hot", "warm", "cold"],
  },
  imageUrl: {
    type: String,
    required: true,
    validate: {
      validator: (value) => validator.isURL(value),
      message: "Invalid URL",
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    likes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "user",
      default: [],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
});
