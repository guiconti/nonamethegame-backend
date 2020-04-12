const logger = require('javascript-custom-logger');
const connectAdventurers = require('../game/connectAdventurers');
const getActiveMaps = require('../game/utils/getActiveMaps');
const getMap = require('../game/utils/getMap');
const getAllItems = require('../game/utils/getAllItems');
const getAllMonsters = require('../game/utils/getAllMonsters');
const getAllMaps = require('../game/utils/getAllMaps');
const gameLoop = require('../game/gameLoop');
const sendAdventurersMetadatas = require('./sendAdventurersMetadatas');
const sendDataToDatabase = require('./sendDataToDatabase');
const { values, engine } = require('../constants');

class Engine {
  constructor(settings = {}) {
    this.tickRate = settings.tickRate || engine.TICK_RATE;
    this.tickRateInNanoseconds =
      Math.floor(values.ONE_SECOND_IN_MILLISECONDS / this.tickRate) *
      values.ONE_MILLISECOND_IN_NANOSECONDS;
    this.updateDatabaseInterval =
      settings.updateDatabaseInterval || engine.UPDATE_DATABASE_INTERVAL;
    this.activeMaps = [];
    this.loop = null;

    // this.ticksSoFar = 0;
    // this.secondsPast = 0;
    // this.currentStartTime = new Date().getTime();
  }

  async start() {
    await this._prepare();
    this._run();
    this.databaseLoop = setInterval(
      this._updateDatabase,
      this.updateDatabaseInterval
    );
  }

  async _prepare() {
    //  Set items and monster into memory for quick access through the game loop
    await getAllItems();
    await getAllMonsters();
    await getAllMaps();
  }

  async _run() {
    // const currentTime = new Date().getTime();
    // if (currentTime - this.currentStartTime >= 999.99) {
    //   this.currentStartTime = currentTime;
    //   this.secondsPast++;
    //   console.log(`Second: ${this.secondsPast} - ${this.ticksSoFar} ticks`);
    // }
    const [secondsStart, nanosecondsStart] = process.hrtime();
    //  Connect players
    try {
      await connectAdventurers();
    } catch (err) {
      logger.error(err);
    }
    try {
      this.activeMaps = await getActiveMaps();
    } catch (err) {
      return;
    }
    this.activeMaps.forEach(async (mapId) => {
      // console.log('Map');
      let currentMap;
      try {
        currentMap = await getMap(mapId, true);
        //  Get player actions
        //  Execute players actions
        //  Execute monster actions
        //  Update maps
        //  Send to each player it's map vision
        const adventurersMapMetadatas = await gameLoop(currentMap, mapId);
        sendAdventurersMetadatas(adventurersMapMetadatas);
      } catch (err) {
        logger.error(err);
      }
    });
    let [secondsEnd, nanosecondsEnd] = process.hrtime();
    if (secondsStart !== secondsEnd) {
      nanosecondsEnd = values.ONE_SECOND_IN_NANOSECONDS + nanosecondsEnd;
    }
    const timePassedInNanoseconds = nanosecondsEnd - nanosecondsStart;
    // this.ticksSoFar++;
    if (timePassedInNanoseconds >= this.tickRateInNanoseconds) {
      this._run();
    } else {
      const timeToNextTick =
        (this.tickRateInNanoseconds - timePassedInNanoseconds) /
        values.ONE_MILLISECOND_IN_NANOSECONDS;
      setTimeout(this._run.bind(this), timeToNextTick);
    }
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
    });
  }

  stop() {
    clearInterval(this.loop);
    clearInterval(this.databaseLoop);
  }
}

module.exports = Engine;
