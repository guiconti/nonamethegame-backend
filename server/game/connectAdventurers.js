const getQueueToConnectAdventurers = require('./utils/getQueueToConnectAdventurers');
const getAdventurer = require('./utils/getAdventurer');
const getConnectedAdventurers = require('./utils/getConnectedAdventurers');
const getMap = require('./utils/getMap');
const getActiveMaps = require('./utils/getActiveMaps');
const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../utils/constants');

module.exports = async () => {
  return new Promise(async (resolve, reject) => {
    let queueToConnectAdventurers;
    try {
      queueToConnectAdventurers = await getQueueToConnectAdventurers();
    } catch(err) {
      return reject(err);
    }
    for (let i = 0; i < queueToConnectAdventurers.length; i++) {
      const adventurerId = queueToConnectAdventurers[i];
      let adventurer;
      try {
        adventurer = await getAdventurer(adventurerId);
      } catch(err) {
        return reject(err);
      }
      const mapId = String(adventurer.currentMap.id);
      let connectedAdventurers;
      let map;
      let activeMaps;
      try {
        connectedAdventurers = await getConnectedAdventurers();
        map = await getMap(mapId);
        activeMaps = await getActiveMaps();
      } catch(err) {
        return reject(err);
      }
      if (!connectedAdventurers.includes(adventurerId)) {
        connectedAdventurers.push(adventurerId);
      }
      if (!map.metadata.adventurers[adventurerId]) {
        map.metadata.adventurers[adventurerId] = {
          position: adventurer.currentMap.position
        };
      }
      if (!activeMaps.includes(mapId)) {
        activeMaps.push(mapId);
      }
      //  TODO: Check if we need to spawn monsters
      cache.set(cachePaths.QUEUE_TO_CONNECT_ADVENTURERS, [], cacheTtls.QUEUE_TO_CONNECT_ADVENTURERS);
      cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedAdventurers, cacheTtls.CONNECTED_ADVENTURERS);
      cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
      cache.set(cachePaths.ACTIVE_MAPS, activeMaps, cacheTtls.ACTIVE_MAPS);
    }
    return resolve();
  });
};
