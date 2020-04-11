const generatePositionId = require('./generatePositionId');
const { tiles } = require('../../constants');

module.exports = (desiredX, desiredY, map) => {
  const isWallOnDesiredMovement =
    desiredY < 0 ||
    desiredY >= map.layout.length ||
    desiredX < 0 ||
    desiredX >= map.layout.length ||
    map.layout[desiredY][desiredX] === tiles.WALL;
  const newPositionId = generatePositionId(desiredX, desiredY);
  const isEntityOnDesiredMovement =
    map.metadata.occupiedPositions[newPositionId];
  return !isWallOnDesiredMovement && !isEntityOnDesiredMovement;
};
