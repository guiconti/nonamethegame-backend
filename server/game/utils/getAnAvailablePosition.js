const canMoveToPosition = require('./canMoveToPosition');

function generateRandomPosition(min, max) {
  return {
    x: Math.floor(Math.random() * (max - min + 1)) + min,
    y: Math.floor(Math.random() * (max - min + 1)) + min,
  };
};

module.exports = map => {
  while (true) {
    const candidatePosition = generateRandomPosition(0, map.layout.length);
    if (canMoveToPosition(candidatePosition.x, candidatePosition.y, map)) {
      return candidatePosition;
    }
  }
};