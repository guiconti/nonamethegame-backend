// Preparation
const fillOccupiedPositions = require('./utils/fillOccupiedPositions');
const getAdventure = require('./utils/getAdventurer');
const getManualAction = require('./getManualAction');
const mergeCurrentActionsAndManualActions = require('./utils/mergeCurrentActionsAndManualActions');
const updateMovementCooldown = require('./updateMovementCooldown');
const updateAttackCooldown = require('./updateAttackCooldown');

//  Actions
const moveAdventurer = require('./moveAdventurer');
const monstersInteractions = require('./monstersInteractions');

const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../constants');

const metadataTemplate = (metadata) => {
  return {
    portals: metadata.portals,
    monsters: {},
    adventurers: {},
    adventurer: {},
  };
};

const adventurersInteractions = (
  adventurersMapMetadatas,
  adventurer,
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
    if (
      xDistance <= adventurer.sightRange &&
      yDistance <= adventurer.sightRange
    ) {
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
  const monstersIds = Object.keys(map.metadata.monsters);
  fillOccupiedPositions(adventurersIds, monstersIds, map.metadata);
  for (let i = 0; i < adventurersIds.length; i++) {
    //  Preparation
    try {
      adventurersMetadatas[adventurersIds[i]] = await getAdventure(
        adventurersIds[i],
        true
      );
    } catch (err) {
      continue;
    }
    const adventurer = adventurersMetadatas[adventurersIds[i]];

    //  Get adventurers intents
    adventurer.manualActions = getManualAction(adventurersIds[i]);
    mergeCurrentActionsAndManualActions(adventurer);

    //  Update cooldown and status
    updateMovementCooldown(adventurer);
    updateAttackCooldown(adventurer);

    //  Actions
    moveAdventurer(adventurer, adventurersIds[i], map, monstersIds);
    //  Move monster
    adventurersMapMetadatas[adventurersIds[i]] = metadataTemplate(map.metadata);
    //  Here will happen the use of attack and skills on monsters
    monstersInteractions(
      adventurersMapMetadatas,
      adventurer,
      adventurersIds[i],
      monstersIds,
      map.metadata
    );
    //  Here will happen the use of attack, skill and trades to other adventurers
    adventurersInteractions(
      adventurersMapMetadatas,
      adventurer,
      adventurersIds[i],
      adventurersIds,
      map.metadata
    );
  }

  //  Reset occupied position. TODO: Improve so we update occupied positions on the fly
  map.metadata.occupiedPositions = {};

  // Save data to cache and send to players
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
