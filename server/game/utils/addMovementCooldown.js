const { game } = require('../../constants');

module.exports = entity => {
  //  TODO: Use and add adventurer movement speed to increase or reduce cooldown
  entity.cooldown.movement = entity.movementSpeed;
};
