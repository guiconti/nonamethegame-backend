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

//  Vision
const addMonsterToAdventurersSights = require('./addMonsterToAdventurersSights');
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
    adventurerAttack(adventurer, adventurersIds[i], map.metadata);

    //  Vision update
    addAdventurersToAdventurerSight(
      adventurersMapMetadatas,
      adventurer,
      adventurersIds[i],
      adventurersIds,
      map.metadata
    );
  }

  //  Run monsters steps
  for (let i = 0; i < monstersIds.length; i++) {
    const monster = map.metadata.monsters[monstersIds[i]];

    //  Update cooldown and status
    updateMovementCooldown(monster);
    updateAttackCooldown(monster);

    //  Actions
    monsterAttack(monster, monstersIds[i], map.metadata);

    // Update map's vision to adventurer
    addMonsterToAdventurersSights(
      adventurersMetadatas,
      adventurersMapMetadatas,
      monster,
      monstersIds[i],
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
