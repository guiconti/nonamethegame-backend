const { values, game } = require('../constants');

module.exports = mongoose => {
  return new mongoose.Schema({
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Users'
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
      required: true
    },
    health: {
      type: Number,
      required: true,
    },
    currentHealth: {
      type: Number,
      required: true,
    },
    mana: {
      type: Number,
      required: true,
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
      default: game.DEFAULT_SIGHT_RANGE
    },
    attackRange: {
      type: Number,
      required: true,
      default: game.DEFAULT_ATTACK_RANGE
    },
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
    }
  });
};
