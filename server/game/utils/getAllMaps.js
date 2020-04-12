const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls, tables, paths } = require('../../constants');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let maps;
    try {
      maps = await findDatabase(tables.MAPS);
    } catch (err) {
      return reject(err);
    }
    for (let i = 0; i < maps.length; i++) {
      const mapData = JSON.parse(
        JSON.stringify(require(`${paths.MAPS}${maps[i].file}`))
      );
      mapData.spawn = maps[i].spawn;
      mapData.metadata.monsters = {};
      mapData.metadata.adventurers = {};
      mapData.metadata.occupiedPositions = {};
      cache.set(cachePaths.MAP_PREFIX + maps[i]._id, mapData, cacheTtls.MAP);
    }
    return resolve(maps);
  });
};
