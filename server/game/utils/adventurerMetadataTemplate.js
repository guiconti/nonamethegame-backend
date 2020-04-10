const { game } = require('../../constants');

module.exports = {
  movement: null,
  attack: null,
  movementSpeed: game.DEFAULT_MOVEMENT_SPEED,
  cooldown: {
    movement: 0,
  },
};
