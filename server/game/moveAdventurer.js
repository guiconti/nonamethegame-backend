const adventurerCanMove = require('./utils/adventurerCanMove');
const addMovementCooldown = require('./utils/addMovementCooldown');
const { game, tiles } = require('../constants');

//  TODO: We can optimize this function
//  Try to do this in O(1) (Will need previous map preparation)
module.exports = (adventurersMetadatas, adventurerId, map, monstersIds) => {
  if (!adventurerCanMove(adventurersMetadatas[adventurerId])) {
    return;
  }
  let movement;
  if (adventurersMetadatas[adventurerId].manualActions) {
    movement = adventurersMetadatas[adventurerId].manualActions.movement;
    //  TODO: Add automatic behaviour movement
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
        let isMonsterOnDesiredMovement = false;
        //  Look for monsters in the spot
        for (let i = 0; i < monstersIds.length; i++) {
          const monsterPosition =
            map.metadata.monsters[monstersIds[i]].position;
          if (
            monsterPosition.x === desiredX &&
            monsterPosition.y === desiredY
          ) {
            isMonsterOnDesiredMovement = true;
            break;
          }
        }
        if (!isMonsterOnDesiredMovement) {
          //  Move
          adventurersMetadatas[adventurerId].currentMap.position.x = desiredX;
          adventurersMetadatas[adventurerId].currentMap.position.y = desiredY;
          map.metadata.adventurers[adventurerId].position.x = desiredX;
          map.metadata.adventurers[adventurerId].position.y = desiredY;

          //  Add cooldown
          addMovementCooldown(adventurersMetadatas[adventurerId]);
        }
      }
    }
  }
};
