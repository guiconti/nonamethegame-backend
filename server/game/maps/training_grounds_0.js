const { tiles } = require('../../constants');

module.exports = {
  layout: [
    tiles.GROUND.repeat(4) + tiles.PORTAL + tiles.GROUND.repeat(5),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
  ],
  metadata: {
    portals: [
      {
        position: {
          x: 0,
          y: 4,
        },
      },
    ],
  },
};
