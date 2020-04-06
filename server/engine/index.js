const cache = require('../utils/cache');
const { cachePaths, engine } = require('../utils/constants');

class Engine {
  constructor(settings = {}) {
    this.tickRate = settings.tickRate || engine.tickRate;
    this.loop = null;
  }

  start() {
    this.loop = setInterval(this._run, 1000 / this.tickRate);
  }

  _run() {
    this.connectedPlayers = cache.get(cachePaths.CONNECTED_ADVENTURERS);
  }

  stop () {
    clearInterval(this.loop);
  }
}

module.exports = Engine;