const { tiles } = require('../../constants');

module.exports = {
  layout: [
    tiles.GROUND.repeat(9) + tiles.PORTAL.repeat(2) + tiles.GROUND.repeat(9),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(20),
    tiles.GROUND.repeat(9) + tiles.PORTAL.repeat(2) + tiles.GROUND.repeat(9),
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
  },
};
