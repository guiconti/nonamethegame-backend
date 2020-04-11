const mapMetadataTemplate = require('./utils/mapMetadataTemplate');

module.exports = (
  adventurersMetadatas,
  adventurersMapMetadatas,
  monster,
  monsterId,
  adventurersIds,
  mapMetadata
) => {
  for (let i = 0; i < adventurersIds.length; i++) {
    if (!adventurersMapMetadatas[adventurersIds[i]]) {
      adventurersMapMetadatas[adventurersIds[i]] = mapMetadataTemplate(mapMetadata);
    }
    const adventurer = adventurersMetadatas[adventurersIds[i]];
    const adventurerPosition = mapMetadata.adventurers[adventurersIds[i]].position;
    const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
    const yDistance = Math.abs(monster.position.y - adventurerPosition.y);

    //  Add to adventurers vision if close enough
    if (
      xDistance <= adventurer.sightRange &&
      yDistance <= adventurer.sightRange
    ) {
      adventurersMapMetadatas[adventurersIds[i]].monsters[monsterId] =
        mapMetadata.monsters[monsterId];
    }
  }
};
