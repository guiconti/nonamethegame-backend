const getAdventurer = require('./getAdventurer');
const getConnectedAdventurers = require('./getConnectedAdventurers');
const getMap = require('./getMap');
const getActiveMaps = require('./getActiveMaps');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls } = require('../../utils/constants');

module.exports = async (adventurerId) => {
  let adventurer;
  let mapId;
  try {
    adventurer = await getAdventurer(String(adventurerId));
    mapId = String(adventurer.currentMap.id);
  } catch (err) {
    return;
  }
  let connectedAdventurers;
  let map;
  try {
    connectedAdventurers = await getConnectedAdventurers();
  } catch(err) {
    return;
  }
  try {
    map = await getMap(mapId)
  } catch(err) {
    return;
  }
  const adventurerIndex = connectedAdventurers.indexOf(adventurerId);
  if (adventurerIndex !== -1) {
    connectedAdventurers.splice(adventurerIndex, 1);
  }
  delete(map.metadata.adventurers[adventurerId]);
  cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedAdventurers, cacheTtls.CONNECTED_ADVENTURERS);
  cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
  if (map.metadata.adventurers.length === 0) {
    let activeMaps;
    try {
      activeMaps = await getActiveMaps();
    } catch(err) {
      return;
    }
    const mapIndex = activeMaps.indexOf(mapId);
    if (mapIndex !== -1) {
      activeMaps.splice(mapIndex, 1);
    }
    cache.set(cachePaths.ACTIVE_MAPS, activeMaps, cacheTtls.ACTIVE_MAPS);
  }
};
