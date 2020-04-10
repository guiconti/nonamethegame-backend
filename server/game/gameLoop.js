// Preparation
const getAdventure = require('./utils/getAdventurer');
const getManualAction = require('./getManualAction');
const updateMovementCooldown = require('./updateMovementCooldown');

//  Actions
const moveAdventurer = require('./moveAdventurer');

const cache = require('../utils/cache');
const { game, cachePaths, cacheTtls } = require('../constants');

const metadataTemplate = (metadata) => {
  return {
    portals: metadata.portals,
    monsters: [],
    adventurers: [],
    adventurer: {},
  };
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
  //  Core loop
  const adventurersIds = Object.keys(map.metadata.adventurers);
  for (let i = 0; i < adventurersIds.length; i++) {
    //  Preparation
    adventurersMetadatas[adventurersIds[i]] = await getAdventure(
      adventurersIds[i]
    );
    //  Update cooldown and status
    updateMovementCooldown(adventurersMetadatas[adventurersIds[i]]);
    adventurersMetadatas[adventurersIds[i]].manualActions = getManualAction(adventurersIds[i]);
    const monstersIds = Object.keys(map.metadata.monsters);

    //  Actions
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
    console.log(adventurersMetadatas[adventurersIds[i]]);
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
