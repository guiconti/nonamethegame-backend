module.exports = (mongoose) => {
  return new mongoose.Schema(
    {
      head: {
        type: Object,
        required: true,
        default: {},
      },
      middleHead: {
        type: Object,
        required: true,
        default: {},
      },
      shoulder: {
        type: Object,
        required: true,
        default: {},
      },
      chest: {
        type: Object,
        required: true,
        default: {},
      },
      rightHand: {
        type: Object,
        required: true,
        default: {},
      },
      leftHand: {
        type: Object,
        required: true,
        default: {},
      },
      feet: {
        type: Object,
        required: true,
        default: {},
      },
      firstAccessory: {
        type: Object,
        required: true,
        default: {},
      },
      secondAccessory: {
        type: Object,
        required: true,
        default: {},
      },
    },
    { minimize: false }
  );
};
