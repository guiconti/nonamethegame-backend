module.exports = (
  adventurerMetadata,
  adventurerMapMetadata,
  adventurerId,
  mapMetadata
) => {
  adventurerMapMetadata.adventurer = mapMetadata.adventurers[adventurerId];
  adventurerMapMetadata.adventurer = {
    position: adventurerMetadata.currentMap.position,
    health: adventurerMetadata.health,
    currentHealth: adventurerMetadata.currentHealth,
    mana: adventurerMetadata.mana,
    currentMana: adventurerMetadata.currentMana,
    experience: adventurerMetadata.experience,
    target: adventurerMetadata.actions.target,
    inventory: adventurerMetadata.inventory,
  }
};
