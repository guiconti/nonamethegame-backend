const { game } = require('../utils/constants');

const metadataTemplate = (metadata) => {
  return {
    portals: metadata.portals,
    monsters: [],
    adventurers: [],
    adventurer: {},
  };
};

//  TODO: Here we are iterating through monster and adventurers on maps.
//  We could execute the adventurers and monster actions in this iteration.

const addMonsters = (adventurersMetadatas, metadata) => {
  const monstersIds = Object.keys(metadata.monsters);
  const adventurersIds = Object.keys(metadata.adventurers);
  for (let i = 0; i < monstersIds.length; i++) {
    const monsterId = monstersIds[i];
    const monsterPosition = metadata.monsters[monsterId].position;
    for (let j = 0; j < adventurersIds.length; j++) {
      const adventurerId = adventurersIds[j];
      const adventurerPosition = metadata.adventurers[adventurerId].position;
      const xDistance = Math.abs(
        monsterPosition.x - adventurerPosition.x
      );
      const yDistance = Math.abs(
        monsterPosition.y - adventurerPosition.y
      );
      if (xDistance <= game.VISION_RANGE && yDistance <= game.VISION_RANGE) {
        if (!adventurersMetadatas[adventurerId]) {
          adventurersMetadatas[adventurerId] = metadataTemplate(metadata);
        }
        adventurersMetadatas[adventurerId].monsters[monsterId] =
          metadata.monsters[monsterId];
      }
    }
  }
  return adventurersMetadatas;
};

const addAdventurers = (adventurersMetadatas, metadata) => {
  const adventurersIds = Object.keys(metadata.adventurers);
  for (let i = 0; i < adventurersIds.length; i++) {
    const firstAdventurerId = adventurersIds[i];
    const firstAdventurerPosition = metadata.adventurers[firstAdventurerId].position;
    if (!adventurersMetadatas[firstAdventurerId]) {
      adventurersMetadatas[firstAdventurerId] = metadataTemplate(metadata);
    }
    adventurersMetadatas[firstAdventurerId].adventurer = metadata.adventurers[firstAdventurerId];
    for (let j = i + 1; j < adventurersIds.length; j++) {
      const secondAdventurerId = adventurersIds[j];
      const secondAdventurerPosition = metadata.adventurers[secondAdventurerId].position;
      const xDistance = Math.abs(
        firstAdventurerPosition.x - secondAdventurerPosition.x
      );
      const yDistance = Math.abs(
        firstAdventurerPosition.y - secondAdventurerPosition.y
      );
      if (xDistance <= game.VISION_RANGE && yDistance <= game.VISION_RANGE) {
        adventurersMetadatas[firstAdventurerId].adventurers[secondAdventurerId] =
          metadata.adventurers[secondAdventurerId];
        if (!adventurersMetadatas[secondAdventurerId]) {
          adventurersMetadatas[secondAdventurerId] = metadataTemplate(metadata);
        }
        adventurersMetadatas[secondAdventurerId].adventurers[firstAdventurerId] =
          metadata.adventurers[firstAdventurerId];
      }
    }
  }
  return adventurersMetadatas;
};

module.exports = (map) => {
  const adventurersMetadatas = [];
  addMonsters(adventurersMetadatas, map.metadata);
  addAdventurers(adventurersMetadatas, map.metadata);
  return adventurersMetadatas;
};
