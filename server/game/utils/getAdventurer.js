const findDatabase = require('../../utils/findDatabase');
const adventurerMetadataTemplate = require('./adventurerMetadataTemplate');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls, tables } = require('../../utils/constants');

module.exports = adventurerId => {
  return new Promise(async (resolve, reject) => {
    let adventurerData = cache.get(cachePaths.ADVENTURER_PREFIX + adventurerId);
    if (adventurerData) {
      return resolve(adventurerData);
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
    adventurerData = { ...adventurer, ...adventurerMetadataTemplate };
    cache.set(cachePaths.ADVENTURER_PREFIX + adventurerId, adventurerData, cacheTtls.ADVENTURER);
    return resolve(adventurerData);
  });
}