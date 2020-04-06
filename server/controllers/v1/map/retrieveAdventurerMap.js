/**
 * @api {GET} /v1/map GET Retrieve adventurer map's info
 * @apiName Retrieve adventurer map's info
 * @apiGroup Map
 * @apiVersion 0.0.1
 *
 * @apiSuccess (200) {String} data Hey.
 * @apiSuccessExample {json} Success-Response:
  {
    "data": [
      {
        "layout": [
          ""
        ]
      }
    ]
  }
 */

const getMap = require('../../../game/utils/getMap');
const { InvalidSelectedAdventurer } = require('../../../utils/errors');

module.exports = async (req, res, next) => {
  if (!req.user.selectedAdventurer || !req.user.selectedAdventurer.currentMap) {
    return next(new InvalidSelectedAdventurer());
  }
  const { id } = req.user.selectedAdventurer.currentMap;
  let map;
  try {
    map = await getMap(id);
  } catch(err) {
    return next(err);
  }
  return res.status(200).json({
    data: {
      map: map.layout,
    },
  });
};
