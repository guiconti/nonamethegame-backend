module.exports = (req, res, next) => {
  return res.status(200).json();
};
/**
 * @api {GET} /v1/maps/:id GET Retrieve map's info
 * @apiName Retrieve map
 * @apiGroup Maps
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
const { tables, paths } = require('../../../utils/constants');

module.exports = async (req, res, next) => {
  const { id } = req.params;
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
