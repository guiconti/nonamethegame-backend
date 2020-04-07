const getActiveMaps = require('../game/utils/getActiveMaps');
const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../utils/constants');

module.exports = (map, mapId, adventurerId) => {
  return new Promise(async (resolve) => {
    cache.del(cachePaths.ADVENTURER_PREFIX + adventurerId);
    cache.del(cachePaths.ADVENTURER_MANUAL_ACTIONS_PREFIX + adventurerId);
    delete map.metadata.adventurers[adventurerId];
    if (map.metadata.adventurers.length > 0) {
      cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
      return resolve();
    }
    //  TODO: Add a mechanism so the map is not deleted right after there is no players inside it.
    cache.del(cachePaths.MAP_PREFIX + mapId);
    const activeMaps = await getActiveMaps();
    const mapIndex = activeMaps.indexOf(mapId);
    if (mapIndex !== -1) {
      activeMaps.splice(mapIndex, 1);
    }
    cache.set(cachePaths.ACTIVE_MAPS, activeMaps, cacheTtls.ACTIVE_MAPS);
    return resolve();
  });
};
