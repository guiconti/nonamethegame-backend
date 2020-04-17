const { values, game } = require('../constants');

module.exports = (mongoose) => {
  return new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users',
    },
    name: {
      type: String,
      unique: true,
      required: true,
    },
    level: {
      type: Number,
      required: true,
    },
    experience: {
      type: Number,
      required: true,
    },
    experienceToNextLevel: {
      type: Number,
      required: true,
    },
    baseHealth: {
      type: Number,
      required: true,
    },
    currentHealth: {
      type: Number,
      required: true,
    },
    baseMana: {
      type: Number,
      required: true,
    },
    baseAttackSpeed: {
      type: Number,
      required: true,
      default: 1,
    },
    baseMovementSpeed: {
      type: Number,
      required: true,
      default: 1,
    },
    currentMana: {
      type: Number,
      required: true,
    },
    class: {
      type: String,
      enum: values.CLASSES,
      required: true,
    },
    race: {
      type: String,
      enum: values.RACES,
      required: true,
    },
    gender: {
      type: String,
      enum: values.GENDERS,
      required: true,
    },
    attributes: {
      type: Object,
      required: true,
    },
    sightRange: {
      type: Number,
      required: true,
      default: game.DEFAULT_SIGHT_RANGE,
    },
    attackRange: {
      type: Number,
      required: true,
      default: game.DEFAULT_ATTACK_RANGE,
    },
    inventory: mongoose.Schema.Inventories,
    equipment: mongoose.Schema.Equipments,
    currentMap: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Maps',
        required: true,
      },
      position: {
        type: Object,
        required: true,
      },
    },
  }, { minimize: false });
};
