const entityCanMove = require('./utils/entityCanMove');
const canMoveToPosition = require('./utils/canMoveToPosition');
const { game } = require('../constants');

module.exports = (monster, adventurersMetadata, map) => {
  monster.actions.movement = null;
  if (!entityCanMove(monster)) {
    return;
  }
  let desiredX = -1;
  let desiredY = -1;
  if (monster.actions.target) {
    const target = adventurersMetadata[monster.actions.target];
    //  Move in direction of target
    const xDistance = Math.abs(
      monster.position.x - target.currentMap.position.x
    );
    const yDistance = Math.abs(
      monster.position.y - target.currentMap.position.y
    );
    if (
      xDistance <= monster.attackRange &&
      yDistance <= monster.attackRange
    ) {
      return;
    }
    if (xDistance >= yDistance) {
      if (monster.position.x < target.currentMap.position.x) {
        desiredX = monster.position.x + 1;
        desiredY = monster.position.y;
        if (canMoveToPosition(desiredX, desiredY, map)) {
          monster.actions.movement = game.DOWN;
          return;
        }
      } else {
        desiredX = monster.position.x - 1;
        desiredY = monster.position.y;
        if (canMoveToPosition(desiredX, desiredY, map)) {
          monster.actions.movement = game.UP;
          return;
        }
      }
    }
    if (monster.position.y < target.currentMap.position.y) {
      desiredX = monster.position.x;
      desiredY = monster.position.y + 1;
      if (canMoveToPosition(desiredX, desiredY, map)) {
        monster.actions.movement = game.RIGHT;
        return;
      }
    } else {
      desiredX = monster.position.x;
      desiredY = monster.position.y - 1;
      if (canMoveToPosition(desiredX, desiredY, map)) {
        monster.actions.movement = game.LEFT;
        return;
      }
    }
  }
  //  Random movement TODO: Improve to calculate a whole random path not a single step
  const POSSIBLE_MOVEMENTS = [game.DOWN, game.UP, game.LEFT, game.RIGHT, null];
  //  Remove impossible movements
  desiredX = monster.position.x + 1;
  desiredY = monster.position.y;
  if (!canMoveToPosition(desiredX, desiredY, map)) {
    POSSIBLE_MOVEMENTS.splice(POSSIBLE_MOVEMENTS.indexOf(game.DOWN), 1);
  }
  desiredX = monster.position.x - 1;
  desiredY = monster.position.y;
  if (!canMoveToPosition(desiredX, desiredY, map)) {
    POSSIBLE_MOVEMENTS.splice(POSSIBLE_MOVEMENTS.indexOf(game.UP), 1);
  }
  desiredX = monster.position.x;
  desiredY = monster.position.y + 1;
  if (!canMoveToPosition(desiredX, desiredY, map)) {
    POSSIBLE_MOVEMENTS.splice(POSSIBLE_MOVEMENTS.indexOf(game.RIGHT), 1);
  }
  desiredX = monster.position.x;
  desiredY = monster.position.y - 1;
  if (!canMoveToPosition(desiredX, desiredY, map)) {
    POSSIBLE_MOVEMENTS.splice(POSSIBLE_MOVEMENTS.indexOf(game.LEFT), 1);
  }
  monster.actions.movement = POSSIBLE_MOVEMENTS[Math.floor(Math.random() * POSSIBLE_MOVEMENTS.length)];
};
