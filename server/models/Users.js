module.exports = mongoose => {
  return new mongoose.Schema({
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    selectedAdventurer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adventurers'
    },
    adventurers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adventurers'
    }]
  });
};
