const cache = require('../utils/cache');
const { cachePaths } = require('../utils/constants');

module.exports = (adventurerId) => {
  return cache.take(cachePaths.ADVENTURER_MANUAL_ACTIONS_PREFIX + adventurerId);
};
