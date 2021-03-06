// Preparation
const fillOccupiedPositions = require('./utils/fillOccupiedPositions');
const spawnMonsters = require('./spawnMonsters');
const getAdventure = require('./utils/getAdventurer');
const getManualAction = require('./getManualAction');
const mergeCurrentActionsAndManualActions = require('./utils/mergeCurrentActionsAndManualActions');
const updateMovementCooldown = require('./updateMovementCooldown');
const updateAttackCooldown = require('./updateAttackCooldown');

//  Actions
const addPoints = require('./addPoints');
const itemInteraction = require('./itemInteraction');
const moveAdventurer = require('./moveAdventurer');
const adventurerAttack = require('./adventurerAttack');
const calculateNextMonsterMovement = require('./calculateNextMonsterMovement');
const moveMonster = require('./moveMonster');
const monsterAttack = require('./monsterAttack');
const handleMonsterDeath = require('./handleMonsterDeath');
const addIfBestTarget = require('./addIfBestTarget');

//  Vision
const mapMetadataTemplate = require('./utils/mapMetadataTemplate');
const addMonsterToAdventurerSight = require('./addMonsterToAdventurerSight');
const addAdventurersToAdventurerSight = require('./addAdventurersToAdventurerSight');

//  Finish
const fillAdventurerInfoToAdventurerMapMetadata = require('./utils/fillAdventurerInfoToAdventurerMapMetadata');

const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../constants');

module.exports = async (map, mapId) => {
  const adventurersMapMetadatas = [];
  const adventurersMetadatas = [];
  //  Core loop
  const adventurersIds = Object.keys(map.metadata.adventurers);
  const monstersIds = Object.keys(map.metadata.monsters);
  fillOccupiedPositions(adventurersIds, monstersIds, map.metadata);
  spawnMonsters(map);
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
    await addPoints(adventurer);
    await itemInteraction(adventurer);
    moveAdventurer(adventurer, adventurersIds[i], map);
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
    calculateNextMonsterMovement(
      monster,
      adventurersMetadatas,
      map
    );
    moveMonster(monster);
    monsterAttack(monster, monstersIds[i], adventurersMetadatas, map.metadata);
    if (monster.dead) {
      await handleMonsterDeath(monster, monstersIds[i], adventurersMetadatas, map);
      continue;
    }

    monster.temporaryTarget = null;
    //  Last iteration through adventures to add relationships between monster and adventurer
    for (let j = 0; j < adventurersIds.length; j++) {
      if (!adventurersMapMetadatas[adventurersIds[j]]) {
        adventurersMapMetadatas[adventurersIds[j]] = mapMetadataTemplate(
          map.metadata
        );
      }
      const adventurer = adventurersMetadatas[adventurersIds[j]];

      addIfBestTarget(
        monster,
        monster.position,
        adventurer,
        adventurer.currentMap.position
      );
      // Update map's vision to adventurer
      addMonsterToAdventurerSight(
        adventurer,
        adventurersIds[j],
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
    if (!adventurersMapMetadatas[adventurersIds[i]]) {
      adventurersMapMetadatas[adventurersIds[i]] = mapMetadataTemplate(
        map.metadata
      );
    }
    fillAdventurerInfoToAdventurerMapMetadata(
      adventurersMetadatas[adventurersIds[i]],
      adventurersMapMetadatas[adventurersIds[i]],
      adventurersIds[i],
      map.metadata
    );
  }
  cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
  return adventurersMapMetadatas;
};
