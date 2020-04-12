module.exports = (
  adventurer,
  adventurerId,
  monster,
  monsterId,
  adventurerPosition,
  adventurersMapMetadatas,
  mapMetadata
) => {
  const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
  const yDistance = Math.abs(monster.position.y - adventurerPosition.y);

  //  Add to adventurers vision if close enough
  if (
    xDistance <= adventurer.sightRange &&
    yDistance <= adventurer.sightRange
  ) {
    adventurersMapMetadatas[adventurerId].monsters[monsterId] = {
      _id: monsterId,
      name: mapMetadata.monsters[monsterId].name,
      level: mapMetadata.monsters[monsterId].level,
      health: mapMetadata.monsters[monsterId].health,
      currentHealth: mapMetadata.monsters[monsterId].currentHealth,
      actions: mapMetadata.monsters[monsterId].actions,
      position: mapMetadata.monsters[monsterId].position,
    };
  }
};
