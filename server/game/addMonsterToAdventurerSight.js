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
    adventurersMapMetadatas[adventurerId].monsters[monsterId] =
      mapMetadata.monsters[monsterId];
  }
};
