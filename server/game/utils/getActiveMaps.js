const cache = require('../../utils/cache');
const { cachePaths } = require('../../utils/constants');

module.exports = () => {
  return new Promise((resolve) => {
    let activeMaps = cache.get(cachePaths.ACTIVE_MAPS);
    if (!activeMaps) {
      activeMaps = [];
    }
    return resolve(activeMaps);
  });
}