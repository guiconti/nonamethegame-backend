module.exports = mongoose => {
  return new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    file: {
      type: String,
      uniquet: true,
      required: true
    },
    adventurers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Adventurers'
    }]
  });
};
