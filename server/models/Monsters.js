const { game, monster } = require('../constants');

module.exports = (mongoose) => {
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
    currentHealth: {
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
    baseAttack: {
      type: Number,
      required: true,
      default: 1,
    },
    baseMagicAttack: {
      type: Number,
      required: true,
      default: 1,
    },
    baseDefense: {
      type: Number,
      required: true,
      default: 1,
    },
    baseMagicDefense: {
      type: Number,
      required: true,
      default: 1,
    },
    baseHit: {
      type: Number,
      required: true,
      default: 1,
    },
    baseFlee: {
      type: Number,
      required: true,
      default: 1,
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
    drops: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Item',
          required: true,
        },
        chance: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],
  });
};
