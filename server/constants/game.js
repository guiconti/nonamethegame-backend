const engine = require('./engine');

module.exports = {
  DEFAULT_SIGHT_RANGE: 6,
  DEFAULT_ATTACK_RANGE: 1,
  MOVEMENT_COOLDOWN: Math.floor(engine.TICK_RATE / 3),
  DEFAULT_MOVEMENT_SPEED: 50,
  MOVEMENTS: ['UP', 'DOWN', 'LEFT', 'RIGHT'],
  UP: 'UP',
  DOWN: 'DOWN',
  LEFT: 'LEFT',
  RIGHT: 'RIGHT',
};
