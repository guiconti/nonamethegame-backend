/**
 * @api {POST} /v1/game/connect POST Connect adventurer
 * @apiName Connect adventurer
 * @apiGroup Map
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
  {
    "data": {}
  }
 */

const cache = require('../../../utils/cache');
const getMap = require('../../../game/utils/getMap');
const getConnectedAventurers = require('../../../game/utils/getConnectedAdventurers');
const getActiveMaps = require('../../../game/utils/getActiveMaps');
const { cachePaths, cacheTtls } = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  const adventurerId = String(req.user.selectedAdventurer._id);
  const mapId = String(req.user.selectedAdventurer.currentMap.id);
  let connectedAdventurers;
  let map;
  let activeMaps;

  try {
    connectedAdventurers = await getConnectedAventurers();
    map = await getMap(mapId);
    activeMaps = await getActiveMaps();
  } catch(err) {
    return next(err);
  }
  
  if (!connectedAdventurers.includes(adventurerId)) {
    connectedAdventurers.push(adventurerId);
  }
  if (!map.metadata.adventurers[adventurerId]) {
    map.metadata.adventurers[adventurerId] = {
      position: req.user.selectedAdventurer.currentMap.position
    };
  }
  if (!activeMaps.includes(mapId)) {
    activeMaps.push(mapId);
  }
  //  TODO: Check if we need to spawn monsters
  cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedAdventurers, cacheTtls.CONNECTED_ADVENTURERS);
  cache.set(cachePaths.MAP_PREFIX + mapId, map, cacheTtls.MAP);
  cache.set(cachePaths.ACTIVE_MAPS, activeMaps, cacheTtls.ACTIVE_MAPS);
  return res.status(200).json();
};
