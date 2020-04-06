const getAdventure = require('./utils/getAdventurer');
const getManualAction = require('./getManualAction');
const cache = require('../utils/cache');
const { game, tiles, cachePaths, cacheTtls } = require('../utils/constants');

const metadataTemplate = (metadata) => {
  return {
    portals: metadata.portals,
    monsters: [],
    adventurers: [],
    adventurer: {},
  };
};

//  TODO: We can optimize this function
//  Try to do this in O(1) (Will need previous map preparation)
const moveAdventurer = (
  adventurersMetadatas,
  adventurerId,
  map,
  monstersIds
) => {
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
        }
      }
    }
  }
};

const monstersInteractions = (
  adventurersMapMetadatas,
  adventurerId,
  monstersIds,
  metadata
) => {
  for (let i = 0; i < monstersIds.length; i++) {
    const monsterId = monstersIds[i];
    const monsterPosition = metadata.monsters[monsterId].position;
    const adventurerPosition = metadata.adventurers[adventurerId].position;

    //  Add to map vision if close enough
    const xDistance = Math.abs(monsterPosition.x - adventurerPosition.x);
    const yDistance = Math.abs(monsterPosition.y - adventurerPosition.y);
    if (xDistance <= game.VISION_RANGE && yDistance <= game.VISION_RANGE) {
      adventurersMapMetadatas[adventurerId].monsters[monsterId] =
        metadata.monsters[monsterId];
    }
  }
  return adventurersMapMetadatas;
};

const adventurersInteractions = (
  adventurersMapMetadatas,
  adventurerId,
  adventurersIds,
  metadata
) => {
  for (let i = 0; i < adventurersIds.length; i++) {
    const otherAdventurerId = adventurersIds[i];
    const otherAdventurerPosition =
      metadata.adventurers[otherAdventurerId].position;
    const adventurerPosition = metadata.adventurers[adventurerId].position;

    //  Add to map vision if close enough
    const xDistance = Math.abs(
      otherAdventurerPosition.x - adventurerPosition.x
    );
    const yDistance = Math.abs(
      otherAdventurerPosition.y - adventurerPosition.y
    );
    if (xDistance <= game.VISION_RANGE && yDistance <= game.VISION_RANGE) {
      adventurersMapMetadatas[adventurerId].adventurers[otherAdventurerId] =
        metadata.adventurers[otherAdventurerId];
    }
  }
  return adventurersMapMetadatas;
};

module.exports = async (map, mapId) => {
  const adventurersMapMetadatas = [];
  const adventurersMetadatas = [];
  const adventurersIds = Object.keys(map.metadata.adventurers);
  for (let i = 0; i < adventurersIds.length; i++) {
    //  Preparation
    adventurersMetadatas[adventurersIds[i]] = await getAdventure(
      adventurersIds[i]
    );
    const manualActions = getManualAction(adventurersIds[i]);
    adventurersMetadatas[adventurersIds[i]].manualActions = manualActions;
    const monstersIds = Object.keys(map.metadata.monsters);

    //  Executions
    moveAdventurer(adventurersMetadatas, adventurersIds[i], map, monstersIds);
    adventurersMapMetadatas[adventurersIds[i]] = metadataTemplate(map.metadata);
    monstersInteractions(
      adventurersMapMetadatas,
      adventurersIds[i],
      monstersIds,
      map.metadata
    );
    adventurersInteractions(
      adventurersMapMetadatas,
      adventurersIds[i],
      adventurersIds,
      map.metadata
    );
  }
  for (let i = 0; i < adventurersIds.length; i++) {
    cache.set(
      cachePaths.ADVENTURER_PREFIX + adventurersIds[i],
      adventurersMetadatas[adventurersIds[i]],
      cacheTtls.ADVENTURER
    );
    adventurersMapMetadatas[adventurersIds[i]].adventurer =
      map.metadata.adventurers[adventurersIds[i]];
  }
  cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
  return adventurersMapMetadatas;
};
