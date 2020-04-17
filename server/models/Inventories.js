module.exports = (mongoose) => {
  return new mongoose.Schema({
    miscellaneous: {
      type: Object,
      required: true,
      default: {},
    },
    consumable: {
      type: Object,
      required: true,
      default: {},
    },
    equipment: {
      type: Object,
      required: true,
      default: {},
    },
    card: {
      type: Object,
      required: true,
      default: {},
    },
  }, { minimize: false });
};
