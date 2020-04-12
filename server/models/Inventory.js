module.exports = (mongoose) => {
  return new mongoose.Schema({
    inventory: {
      type: Object,
      required: true,
      default: {
        miscellaneous: {
          type: Object,
          default: {},
        },
        consumable: {
          type: Object,
          default: {},
        },
        equipment: {
          type: Object,
          default: {},
        },
        card: {
          type: Object,
          default: {},
        },
      },
    },
  });
};
