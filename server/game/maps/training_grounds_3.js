const { tiles } = require('../../constants');

module.exports = {
  layout: [
    tiles.PORTAL + tiles.GROUND.repeat(2) + tiles.WALL.repeat(14) + tiles.GROUND.repeat(2) + tiles.PORTAL,
    tiles.WALL + tiles.GROUND.repeat(3) + tiles.WALL.repeat(12) + tiles.GROUND.repeat(3) + tiles.WALL,
    tiles.WALL.repeat(2) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(10) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(2),
    tiles.WALL.repeat(3) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(8) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(3),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(6) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(4),
    tiles.WALL.repeat(5) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(4) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(5),
    tiles.WALL.repeat(6) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(2) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(6),
    tiles.WALL.repeat(7) + tiles.GROUND.repeat(3) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(7),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(8) + tiles.GROUND.repeat(4) + tiles.WALL.repeat(8),
    tiles.WALL.repeat(7) + tiles.GROUND.repeat(3) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(7),
    tiles.WALL.repeat(6) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(2) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(6),
    tiles.WALL.repeat(5) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(4) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(5),
    tiles.WALL.repeat(4) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(6) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(4),
    tiles.WALL.repeat(3) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(8) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(3),
    tiles.WALL.repeat(2) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(10) + tiles.GROUND.repeat(3) + tiles.WALL.repeat(2),
    tiles.WALL + tiles.GROUND.repeat(3) + tiles.WALL.repeat(12) + tiles.GROUND.repeat(3) + tiles.WALL,
    tiles.PORTAL + tiles.GROUND.repeat(2) + tiles.WALL.repeat(14) + tiles.GROUND.repeat(2) + tiles.PORTAL,
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
