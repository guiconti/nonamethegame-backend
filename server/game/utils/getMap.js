const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const {
  cachePaths,
  cacheTtls,
  tables,
  paths,
} = require('../../constants');

module.exports = (mapId) => {
  return new Promise(async (resolve, reject) => {
    let mapData = cache.get(cachePaths.MAP_PREFIX + mapId);
    if (mapData) {
      return resolve(mapData);
    }
    let map;
    try {
      map = await findDatabase(tables.MAPS, { _id: mapId }, [], 0, 1);
    } catch (err) {
      return reject(err);
    }
    mapData = JSON.parse(JSON.stringify(require(`${paths.MAPS}${map.file}`)));
    cache.set(cachePaths.MAP_PREFIX + mapId, mapData, cacheTtls.MAP);
    return resolve(mapData);
  });
};
