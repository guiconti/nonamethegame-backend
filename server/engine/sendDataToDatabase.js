const getConnectedAdventurers = require('../game/utils/getConnectedAdventurers');
const getAdventurer = require('../game/utils/getAdventurer');
const updateDatabase = require('../utils/updateDatabase');
const deleteInactiveAdventurerDataFromCache = require('./deleteInactiveAdventurerDataFromCache');
const { tables } = require('../constants');

module.exports = (map, mapId) => {
  return new Promise(async (resolve, reject) => {
    const connectedAdventurers = await getConnectedAdventurers();
    const adventurersIds = Object.keys(map.metadata.adventurers);
    for (let i = 0; i < adventurersIds.length; i++) {
      const adventurer = await getAdventurer(adventurersIds[i]);
      const adventurerDataToBeUpdated = {
        level: adventurer.level,
        experience: adventurer.experience,
        experienceToNextLevel: adventurer.experienceToNextLevel,
        health: adventurer.health,
        currentHealth: adventurer.currentHealth,
        mana: adventurer.mana,
        currentMana: adventurer.currentMana,
        class: adventurer.class,
        attributes: adventurer.attributes,
        inventory: adventurer.inventory,
        equipment: adventurer.equipment,
        currentMap: adventurer.currentMap,
      };
      updateDatabase(tables.ADVENTURERS, adventurersIds[i], adventurerDataToBeUpdated);
      const adventurerIndex = connectedAdventurers.indexOf(adventurersIds[i]);
      if (adventurerIndex === -1) {
        deleteInactiveAdventurerDataFromCache(map, mapId, adventurersIds[i]);
      }
    }
  });
};
