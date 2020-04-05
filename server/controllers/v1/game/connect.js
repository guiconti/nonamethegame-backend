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
const findDatabase = require('../../../utils/findDatabase');
const { cachePaths, cacheTtls, tables, paths } = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  const adventurerId = String(req.user.selectedAdventurer._id);
  const mapId = String(req.user.selectedAdventurer.currentMap.id);
  let connectedPlayers = cache.get(cachePaths.CONNECTED_ADVENTURERS);
  let mapData = cache.get(cachePaths.MAP_PREFIX + mapId);
  let activeMaps = cache.get(cachePaths.ACTIVE_MAPS);
  if (!connectedPlayers) {
    connectedPlayers = [];
  }
  if (!connectedPlayers.includes(adventurerId)) {
    connectedPlayers.push(adventurerId);
  }
  if (!mapData) {
    let map;
    try {
      map = await findDatabase(
        tables.MAPS,
        { _id: mapId },
        [],
        0,
        1
      );
    } catch (err) {
      return next(err);
    }
    mapData = require(`${paths.MAPS}${map.file}`);
    //  TODO: Spawn monsters
  }
  if (!mapData.metadata.adventurers[adventurerId]) {
    mapData.metadata.adventurers[adventurerId] = {
      position: req.user.selectedAdventurer.currentMap.position
    };
  }
  if (!activeMaps) {
    activeMaps = [mapId];
  } else if (!activeMaps.includes(mapId)) {
    activeMaps.push(mapId);
  }
  //  TODO: Check if we need to spawn monsters
  cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedPlayers, cacheTtls.CONNECTED_ADVENTURERS);
  cache.set(cachePaths.MAP_PREFIX + mapId, mapData, cacheTtls.MAP);
  cache.set(cachePaths.ACTIVE_MAPS, activeMaps, cacheTtls.ACTIVE_MAPS);
  return res.status(200).json();
};
