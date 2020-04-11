const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const getMonster = require('./getMonster');
const { cachePaths, cacheTtls, tables, paths } = require('../../constants');

let alreadyRetrievingMap = false;

module.exports = (mapId, onlyFromCache) => {
  return new Promise(async (resolve, reject) => {
    let mapData = cache.get(cachePaths.MAP_PREFIX + mapId);
    if (mapData) {
      return resolve(mapData);
    }
    if (onlyFromCache) {
      reject();
    }
    if (alreadyRetrievingMap) {
      return reject();
    }
    alreadyRetrievingMap = true;
    let map;
    try {
      map = await findDatabase(tables.MAPS, { _id: mapId }, [], 0, 1);
    } catch (err) {
      return reject(err);
    }
    mapData = JSON.parse(JSON.stringify(require(`${paths.MAPS}${map.file}`)));
    mapData.spawn = map.spawn;
    mapData.metadata.monsters = {};
    mapData.metadata.adventurers = {};
    mapData.metadata.occupiedPositions = {};
    //  Fill monsters
    for (let i = 0; i < mapData.spawn.length; i++) {
      await getMonster(mapData.spawn[i].id);
      mapData.spawn[mapData.spawn[i].id] = {
        spawned: 0
      };
    }
    cache.set(cachePaths.MAP_PREFIX + mapId, mapData, cacheTtls.MAP);
    alreadyRetrievingMap = false;
    return resolve(mapData);
  });
};
