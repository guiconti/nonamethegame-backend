const { game, monster } = require('../constants');

module.exports = mongoose => {
  return new mongoose.Schema({
    name: {
      type: String,
      unique: true,
      required: true,
    },
    level: {
      type: Number,
      required: true,
      default: 1,
    },
    health: {
      type: Number,
      required: true,
      default: 100,
    },
    experience: {
      type: Number,
      required: true,
      default: 1,
    },
    race: {
      type: String,
      enum: monster.RACES,
      required: true,
    },
    property: {
      type: String,
      enum: monster.PROPERTIES,
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
    attributes: {
      strength: {
        type: Number,
        required: true,
        default: 1,
      },
      intelligence: {
        type: Number,
        required: true,
        default: 1,
      },
      agility: {
        type: Number,
        required: true,
        default: 1,
      },
      dexterity: {
        type: Number,
        required: true,
        default: 1,
      },
      vitality: {
        type: Number,
        required: true,
        default: 1,
      },
    },
    attack: {
      type: Number,
      required: true,
      default: 1,
    },
    magicAttack: {
      type: Number,
      required: true,
      default: 1,
    },
    defense: {
      type: Number,
      required: true,
      default: 1,
    },
    magicDefense: {
      type: Number,
      required: true,
      default: 1,
    },
    cooldowns: {
      movement: {
        type: Number,
        required: true,
        default: 1,
      },
      attack: {
        type: Number,
        required: true,
        default: 1,
      },
    }
  });
};
