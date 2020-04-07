const getActiveMaps = require('../game/utils/getActiveMaps');
const getMap = require('../game/utils/getMap');
const gameLoop = require('../game/gameLoop');
const sendAdventurersMetadatas = require('./sendAdventurersMetadatas');
const sendDataToDatabase = require('./sendDataToDatabase');
const { engine } = require('../utils/constants');

class Engine {
  constructor(settings = {}) {
    this.tickRate = settings.tickRate || engine.TICK_RATE;
    this.updateDatabaseInterval =
      settings.updateDatabaseInterval || engine.UPDATE_DATABASE_INTERVAL;
    this.activeMaps = [];
    this.loop = null;
  }

  start() {
    this.loop = setInterval(this._run, 1000 / this.tickRate);
    this.databaseLoop = setInterval(this._updateDatabase, this.updateDatabaseInterval);
  }

  async _run() {
    try {
      this.activeMaps = await getActiveMaps();
    } catch (err) {
      return;
    }
    this.activeMaps.forEach(async (mapId) => {
      let currentMap;
      try {
        currentMap = await getMap(mapId);
        //  Get player actions
        //  Execute players actions
        //  Execute monster actions
        //  Update maps
        //  Send to each player it's map vision
        const adventurersMapMetadatas = await gameLoop(currentMap, mapId);
        sendAdventurersMetadatas(adventurersMapMetadatas);
      } catch (err) {
        return;
      }
      return;
    });
  }

  async _updateDatabase() {
    try {
      this.activeMaps = await getActiveMaps();
    } catch (err) {
      return;
    }
    this.activeMaps.forEach(async (mapId) => {
      let currentMap;
      try {
        currentMap = await getMap(mapId);
        sendDataToDatabase(currentMap, mapId);
      } catch (err) {
        return;
      }
      return;
    });
  }

  stop() {
    clearInterval(this.loop);
    clearInterval(this.databaseLoop);
  }
}

module.exports = Engine;
