const entityCanMove = require('./utils/entityCanMove');
const addMovementCooldown = require('./utils/addMovementCooldown');
const generatePositionId = require('./utils/generatePositionId');
const { game, tiles } = require('../constants');

module.exports = (adventurer, adventurerId, map) => {
  if (!entityCanMove(adventurer)) {
    adventurer.actions.movement = null;
    return;
  }
  let movement;
  if (adventurer.actions) {
    movement = adventurer.actions.movement;
    adventurer.actions.movement = null;
  }
  if (movement) {
    let desiredMovementX = 0;
    let desiredMovementY = 0;
    switch (movement) {
      case game.UP:
        desiredMovementY = -1;
        break;
      case game.DOWN:
        desiredMovementY = 1;
        break;
      case game.LEFT:
        desiredMovementX = -1;
        break;
      case game.RIGHT:
        desiredMovementX = 1;
        break;
      default:
        break;
    }
    if (desiredMovementX !== 0 || desiredMovementY !== 0) {
      //  Check if the player can move
      const desiredX =
        map.metadata.adventurers[adventurerId].position.x + desiredMovementX;
      const desiredY =
        map.metadata.adventurers[adventurerId].position.y + desiredMovementY;
      const isWallOnDesiredMovement =
        map.layout[desiredY][desiredX] === tiles.WALL ||
        desiredY < 0 ||
        desiredY >= map.layout.length ||
        desiredX < 0 ||
        desiredX >= map.layout.length;
      if (!isWallOnDesiredMovement) {
        const newPositionId = generatePositionId(desiredX, desiredY);
        const isEntityOnDesiredMovement = map.metadata.occupiedPositions[newPositionId];
        //  Look for monsters in the spot
        if (!isEntityOnDesiredMovement) {
          //  Move
          const oldPositionId = generatePositionId(adventurer.currentMap.position.x, adventurer.currentMap.position.y);
          map.metadata.occupiedPositions[oldPositionId]--;
          adventurer.currentMap.position.x = desiredX;
          adventurer.currentMap.position.y = desiredY;
          map.metadata.adventurers[adventurerId].position.x = desiredX;
          map.metadata.adventurers[adventurerId].position.y = desiredY;
          if (map.metadata.occupiedPositions[newPositionId] === undefined) {
            map.metadata.occupiedPositions[newPositionId] = 0;
          }
          map.metadata.occupiedPositions[newPositionId]++;
          //  Add cooldown
          addMovementCooldown(adventurer);
        }
      }
    }
  }
};
