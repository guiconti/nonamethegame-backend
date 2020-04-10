const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const {
  cachePaths,
  cacheTtls,
  tables,
  paths,
} = require('../../constants');

module.exports = (mapId, onlyFromCache) => {
  return new Promise(async (resolve, reject) => {
    let mapData = cache.get(cachePaths.MAP_PREFIX + mapId);
    if (mapData) {
      return resolve(mapData);
    }
    if (onlyFromCache) {
      reject();
    }
    let map;
    try {
      map = await findDatabase(tables.MAPS, { _id: mapId }, [], 0, 1);
    } catch (err) {
      return reject(err);
    }
    mapData = JSON.parse(JSON.stringify(require(`${paths.MAPS}${map.file}`)));
    mapData.spawn = map.spawn;
    //  Fill monsters
    cache.set(cachePaths.MAP_PREFIX + mapId, mapData, cacheTtls.MAP);
    return resolve(mapData);
  });
};
