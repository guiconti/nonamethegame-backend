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
  let connectedPlayers = cache.get(cachePaths.CONNECTED_ADVENTURERS);
  let mapData = cache.get(cachePaths.MAP_PREFIX + req.user.selectedAdventurer.currentMap.id);
  if (!connectedPlayers) {
    connectedPlayers = [];
  }
  if (!connectedPlayers.includes(String(req.user.selectedAdventurer._id))) {
    connectedPlayers.push(String(req.user.selectedAdventurer._id));
  }
  if (!mapData) {
    const { id } = req.user.selectedAdventurer.currentMap;
    let map;
    try {
      map = await findDatabase(
        tables.MAPS,
        { _id: id },
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
  if (!mapData.metadata.adventurers[req.user.selectedAdventurer._id]) {
    mapData.metadata.adventurers[req.user.selectedAdventurer._id] = {
      id: req.user.selectedAdventurer._id,
      position: req.user.selectedAdventurer.currentMap.position
    };
  }
  //  TODO: Check if we need to spawn monsters
  cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedPlayers, cacheTtls.CONNECTED_ADVENTURERS);
  cache.set(cachePaths.MAP_PREFIX + req.user.selectedAdventurer.currentMap.id, mapData, cacheTtls.MAP);
  return res.status(200).json();
};
