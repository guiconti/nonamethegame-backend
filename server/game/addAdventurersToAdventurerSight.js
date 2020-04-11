module.exports = (
  adventurersMapMetadatas,
  adventurer,
  adventurerId,
  adventurersIds,
  metadata
) => {
  for (let i = 0; i < adventurersIds.length; i++) {
    const otherAdventurerId = adventurersIds[i];
    if (otherAdventurerId === adventurerId) {
      continue;
    }
    const otherAdventurerPosition =
      metadata.adventurers[otherAdventurerId].position;
    const adventurerPosition = metadata.adventurers[adventurerId].position;

    //  Add to map vision if close enough
    const xDistance = Math.abs(
      otherAdventurerPosition.x - adventurerPosition.x
    );
    const yDistance = Math.abs(
      otherAdventurerPosition.y - adventurerPosition.y
    );
    if (
      xDistance <= adventurer.sightRange &&
      yDistance <= adventurer.sightRange
    ) {
      adventurersMapMetadatas[adventurerId].adventurers[otherAdventurerId] =
        metadata.adventurers[otherAdventurerId];
    }
  }
};
