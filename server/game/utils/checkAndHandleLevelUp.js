const { game } = require('../../constants');

module.exports = adventurer => {
  if (adventurer.experience >= adventurer.experienceToNextLevel) {
    adventurer.level++;
    adventurer.experienceToNextLevel = game.EXPERIENCE_TABLE[adventurer.level];
    adventurer.pointsToDistribute += game.POINTS_PER_LEVEL;
  }
};
