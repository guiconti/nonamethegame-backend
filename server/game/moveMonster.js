const { game } = require('../constants');
const addMovementCooldown = require('./utils/addMovementCooldown');

module.exports = (monster) => {
  switch(monster.actions.movement) {
    case game.DOWN:
      monster.position.x += 1;
      addMovementCooldown(monster);
      break;
    case game.UP:
      monster.position.x -= 1;
      addMovementCooldown(monster);
      break;
    case game.RIGHT:
      monster.position.y += 1;
      addMovementCooldown(monster);
      break;
    case game.LEFT:
      monster.position.y -= 1;
      addMovementCooldown(monster);
      break;
    default:
      break;
  }
}