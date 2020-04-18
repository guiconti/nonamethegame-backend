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
    experienceToNextLevel: adventurerMetadata.experienceToNextLevel,
    target: adventurerMetadata.actions.target,
    inventory: adventurerMetadata.inventory,
    equipment: adventurerMetadata.equipment,
    pointsToDistribute: adventurerMetadata.pointsToDistribute,
  }
};
