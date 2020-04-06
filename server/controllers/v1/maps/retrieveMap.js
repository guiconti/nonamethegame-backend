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
const getMap = require('../../../game/utils/getMap');

module.exports = async (req, res, next) => {
  const { id } = req.params;
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
