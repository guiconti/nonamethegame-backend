const { tiles } = require('../../utils/constants');

module.exports = {
  layout: [
    tiles.GROUND.repeat(4) + tiles.PORTAL.repeat(2) + tiles.GROUND.repeat(4),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(2) + tiles.WALL.repeat(4),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(2) + tiles.WALL.repeat(4),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(2) + tiles.WALL.repeat(4),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(2) + tiles.WALL.repeat(4),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(10),
    tiles.GROUND.repeat(4) + tiles.PORTAL.repeat(2) + tiles.GROUND.repeat(4),
  ],
  metadata: {
    portals: [
      {
        position: {
          x: 0,
          y: 4,
        },
      },
      {
        position: {
          x: 9,
          y: 4,
        },
      },
    ],
    monsters: [],
    adventurers: [],
  },
};
