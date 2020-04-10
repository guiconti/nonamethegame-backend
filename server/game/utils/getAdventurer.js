const findDatabase = require('../../utils/findDatabase');
const adventurerMetadataTemplate = require('./adventurerMetadataTemplate');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls, tables } = require('../../constants');

module.exports = (adventurerId, onlyFromCache) => {
  return new Promise(async (resolve, reject) => {
    let adventurerData = cache.get(cachePaths.ADVENTURER_PREFIX + adventurerId);
    if (adventurerData) {
      return resolve(adventurerData);
    }
    //  Dont block getting from database
    if (onlyFromCache) {
      reject();
    }
    let adventurer;
    try {
      adventurer = await findDatabase(
        tables.ADVENTURERS,
        { _id: adventurerId },
        [],
        0,
        1
      );
    } catch (err) {
      return reject(err);
    }
    const newAdventurerMetadataTemplate = JSON.parse(
      JSON.stringify(adventurerMetadataTemplate)
    );
    adventurerData = { ...adventurer, ...newAdventurerMetadataTemplate };
    cache.set(
      cachePaths.ADVENTURER_PREFIX + adventurerId,
      adventurerData,
      cacheTtls.ADVENTURER
    );
    return resolve(adventurerData);
  });
};
