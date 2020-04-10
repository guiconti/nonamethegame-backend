module.exports = (mongoose) => {
  return new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    file: {
      type: String,
      unique: true,
      required: true,
    },
    adventurers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Adventurers',
      },
    ],
    spawn: [
      {
        id: mongoose.Schema.Types.ObjectId,
        amount: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  });
};
