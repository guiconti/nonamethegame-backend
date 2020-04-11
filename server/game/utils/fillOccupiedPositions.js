const generatePositionId = require('./generatePositionId');

module.exports = (adventurersIds, monstersIds, mapMetadata) => {
  for (let i = 0; i < adventurersIds.length; i++) {
    const adventurer = mapMetadata.adventurers[adventurersIds[i]];
    const positionId = generatePositionId(
      adventurer.position.x,
      adventurer.position.y
    );
    if (mapMetadata.occupiedPositions[positionId] === undefined) {
      mapMetadata.occupiedPositions[positionId] = 0;
    }
    mapMetadata.occupiedPositions[positionId]++;
  }
  for (let i = 0; i < monstersIds.length; i++) {
    const monster = mapMetadata.monsters[monstersIds[i]];
    const positionId = generatePositionId(
      monster.position.x,
      monster.position.y
    );
    if (mapMetadata.occupiedPositions[positionId] === undefined) {
      mapMetadata.occupiedPositions[positionId] = 0;
    }
    mapMetadata.occupiedPositions[positionId]++;
  }
};
