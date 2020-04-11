module.exports = (
  adventurersMapMetadatas,
  adventurer,
  adventurerId,
  monstersIds,
  mapMetadata
) => {
  for (let i = 0; i < monstersIds.length; i++) {
    const monsterId = monstersIds[i];
    const monster = mapMetadata.monsters[monsterId];
    const adventurerPosition = mapMetadata.adventurers[adventurerId].position;
    const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
    const yDistance = Math.abs(monster.position.y - adventurerPosition.y);

    //  Add to map vision if close enough
    if (
      xDistance <= adventurer.sightRange &&
      yDistance <= adventurer.sightRange
    ) {
      adventurersMapMetadatas[adventurerId].monsters[monsterId] =
        mapMetadata.monsters[monsterId];
    }
  }
};
