const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls, tables } = require('../../constants');

let alreadyRetrievingItem = false;

module.exports = (itemId, onlyFromCache) => {
  return new Promise(async (resolve, reject) => {
    let item = cache.get(cachePaths.ITEM_PREFIX + itemId);
    if (item) {
      return resolve(item);
    }
    //  Dont block getting from database
    if (onlyFromCache) {
      reject();
    }
    if (alreadyRetrievingItem) {
      return reject();
    }
    alreadyRetrievingItem = true;
    try {
      item = await findDatabase(
        tables.ITEMS,
        { _id: itemId },
        [],
        0,
        1
      );
    } catch (err) {
      return reject(err);
    }
    cache.set(
      cachePaths.ITEM_PREFIX + itemId,
      item,
      cacheTtls.ITEM
    );
    alreadyRetrievingItem = false;
    return resolve(item);
  });
};
