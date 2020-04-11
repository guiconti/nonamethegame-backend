// Preparation
const fillOccupiedPositions = require('./utils/fillOccupiedPositions');
const getAdventure = require('./utils/getAdventurer');
const getManualAction = require('./getManualAction');
const mergeCurrentActionsAndManualActions = require('./utils/mergeCurrentActionsAndManualActions');
const updateMovementCooldown = require('./updateMovementCooldown');
const updateAttackCooldown = require('./updateAttackCooldown');

//  Actions
const monsterAttack = require('./monsterAttack');
const moveAdventurer = require('./moveAdventurer');
const adventurerAttack = require('./adventurerAttack');
const addIfBestTarget = require('./addIfBestTarget');

//  Vision
const mapMetadataTemplate = require('./utils/mapMetadataTemplate');
const addMonsterToAdventurerSight = require('./addMonsterToAdventurerSight');
const addAdventurersToAdventurerSight = require('./addAdventurersToAdventurerSight');

const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../constants');

module.exports = async (map, mapId) => {
  const adventurersMapMetadatas = [];
  const adventurersMetadatas = [];
  //  Core loop
  const adventurersIds = Object.keys(map.metadata.adventurers);
  const monstersIds = Object.keys(map.metadata.monsters);
  fillOccupiedPositions(adventurersIds, monstersIds, map.metadata);

  //  Run adventurers steps
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
    adventurerAttack(adventurer, map.metadata);

    //  Vision update
    // addAdventurersToAdventurerSight(
    //   adventurersMapMetadatas,
    //   adventurer,
    //   adventurersIds[i],
    //   adventurersIds,
    //   map.metadata
    // );
  }

  //  Run monsters steps
  for (let i = 0; i < monstersIds.length; i++) {
    const monster = map.metadata.monsters[monstersIds[i]];

    //  Update cooldown and status
    updateMovementCooldown(monster);
    updateAttackCooldown(monster);

    //  Actions
    // TODO: Move Monster if no target
    monsterAttack(monster, monstersIds[i], adventurersMetadatas, map.metadata);
    monster.temporaryTarget = null;
    //  Last iteration through adventures to add relationships between monster and adventurer
    for (let j = 0; j < adventurersIds.length; j++) {
      if (!adventurersMapMetadatas[adventurersIds[i]]) {
        adventurersMapMetadatas[adventurersIds[i]] = mapMetadataTemplate(
          map.metadata
        );
      }
      const adventurer = adventurersMetadatas[adventurersIds[i]];
      
      addIfBestTarget(
        monster,
        monster.position,
        adventurer,
        adventurer.currentMap.position
      );
      // Update map's vision to adventurer
      addMonsterToAdventurerSight(
        adventurer,
        adventurersIds[i],
        monster,
        monstersIds[i],
        adventurer.currentMap.position,
        adventurersMapMetadatas,
        map.metadata
      );
    }
  }

  //  Reset occupied position.
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
