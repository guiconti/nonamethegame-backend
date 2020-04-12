const { item } = require('../constants');

module.exports = (mongoose) => {
  return new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    description: {
      type: String,
      required: true,
      default: '',
    },
    type: {
      type: String,
      enum: item.TYPES,
      required: true,
      default: item.MISCELLANEOUS_TYPE,
    },
    weight: {
      type: Number,
      required: true,
      default: 1,
    },
    value: {
      type: Number,
      required: true,
      default: 0,
    },
  });
};
