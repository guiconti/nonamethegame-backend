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
const getConnectedAventurers = require('../../../game/utils/getConnectedAdventurers');
const getQueueToConnectAdventurers = require('../../../game/utils/getQueueToConnectAdventurers');
const { cachePaths, cacheTtls } = require('../../../constants');

module.exports = async (req, res, next) => {
  const adventurerId = String(req.user.selectedAdventurer._id);
  let connectedAdventurers;
  try {
    connectedAdventurers = await getConnectedAventurers();
  } catch (err) {
    return next(err);
  }
  if (connectedAdventurers.includes(adventurerId)) {
    return res.status(200).json();
  }

  let queueToConnectAdventurers;
  try {
    queueToConnectAdventurers = await getQueueToConnectAdventurers();
  } catch (err) {
    return next(err);
  }
  if (queueToConnectAdventurers.includes(adventurerId)) {
    return res.status(200).json();
  }

  queueToConnectAdventurers.push(adventurerId);
  cache.set(
    cachePaths.QUEUE_TO_CONNECT_ADVENTURERS,
    queueToConnectAdventurers,
    cacheTtls.QUEUE_TO_CONNECT_ADVENTURERS
  );
  return res.status(200).json();
};
