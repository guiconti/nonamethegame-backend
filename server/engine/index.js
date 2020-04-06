const getActiveMaps = require('../game/utils/getActiveMaps');
const getMap = require('../game/utils/getMap');
const getMapMetadataForAdventurers = require('../game/getMapMetadataForAdventurers');
const sendAdventurersMetadatas = require('./sendAdventurersMetadatas');
const { engine } = require('../utils/constants');

class Engine {
  constructor(settings = {}) {
    this.tickRate = settings.tickRate || engine.TICK_RATE;
    this.activeMaps = [];
    this.loop = null;
  }

  start() {
    this.loop = setInterval(this._run, 1000 / this.tickRate);
  }

  async _run() {
    try {
      this.activeMaps = await getActiveMaps();
    } catch(err) {
      return;
    }
    this.activeMaps.forEach(async mapId => {
      let currentMap;
      try {
        currentMap = await getMap(mapId);
        //  Get player actions
        //  Execute players actions
        //  Execute monster actions
        //  Update maps
        //  Send to each player it's map vision
        const adventurersMapMetadatas = getMapMetadataForAdventurers(currentMap);
        sendAdventurersMetadatas(adventurersMapMetadatas);
      } catch(err) {
        return;
      }
      return;
    });
  }

  stop () {
    clearInterval(this.loop);
  }
}

module.exports = Engine;