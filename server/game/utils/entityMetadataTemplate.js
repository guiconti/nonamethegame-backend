const { game } = require('../../constants');

module.exports = (entity) => {
  return {
    movementSpeed: entity.movementSpeed ? entity.movementSpeed : game.DEFAULT_MOVEMENT_SPEED,
    attackSpeed: entity.attackSpeed ? entity.attackSpeed : game.DEFAULT_MOVEMENT_SPEED,
    actions: {
      movement: null,
      target: null,
      attack: null,
    },
    cooldown: {
      movement: 0,
      attack: 0,
    },
  };
};
