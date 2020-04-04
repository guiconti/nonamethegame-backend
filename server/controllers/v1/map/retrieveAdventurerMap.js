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

const findDatabase = require('../../../utils/findDatabase');
const { InvalidSelectedAdventurer } = require('../../../utils/errors');
const { tables, paths } = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  if (!req.user.selectedAdventurer || !req.user.selectedAdventurer.currentMap) {
    return next(new InvalidSelectedAdventurer());
  }
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
  const mapFile = require(`${paths.MAPS}${map.file}`);
  return res.status(200).json({
    data: {
      map: mapFile.layout,
    },
  });
};
