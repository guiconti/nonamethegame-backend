module.exports = (
  adventurerMetadata,
  adventurerMapMetadata,
  adventurerId,
  mapMetadata
) => {
  adventurerMapMetadata.adventurer = mapMetadata.adventurers[adventurerId];
  adventurerMapMetadata.adventurer = {
    position: adventurerMetadata.currentMap.position,
    currentHealth: adventurerMetadata.currentHealth,
    currentMana: adventurerMetadata.currentMana,
    target: adventurerMetadata.actions.target
  }
};
