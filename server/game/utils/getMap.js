const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const getMonster = require('./getMonster');
const generateUniqueId = require('../../utils/generateUniqueId');
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
    //  Fill monsters
    for (let i = 0; i < mapData.spawn.length; i++) {
      for (let j = 0; j < mapData.spawn[i].amount; j++) {
        const monsterId = mapData.spawn[i].id + generateUniqueId();
        //  TODO: Check if we can improve this adding paralelization to different monster ids
        mapData.metadata.monsters[monsterId] = await getMonster(
          mapData.spawn[i].id
        );
        //  TODO: Check a correct spot for spawn
        mapData.metadata.monsters[monsterId].position = {
          x: 0,
          y: 0,
        };
      }
    }
    cache.set(cachePaths.MAP_PREFIX + mapId, mapData, cacheTtls.MAP);
    alreadyRetrievingMap = false;
    return resolve(mapData);
  });
};
