const { game } = require('../../constants');

module.exports = entity => {
  //  TODO: Use and add adventurer attack speed to increase or reduce cooldown
  entity.cooldown.attack = game.ATTACK_COOLDOWN;
};
