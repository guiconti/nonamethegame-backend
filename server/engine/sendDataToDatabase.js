const getAdventurer = require('../game/utils/getAdventurer');
const updateDatabase = require('../utils/updateDatabase');
const { tables } = require('../utils/constants');

module.exports = map => {
  return new Promise(async (resolve, reject) => {
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
        currentMap: adventurer.currentMap
      };
      updateDatabase(tables, adventurersIds[i], adventurerDataToBeUpdated);
    }
  });
};
