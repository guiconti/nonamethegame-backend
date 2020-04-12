const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls, tables } = require('../../constants');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let items;
    try {
      items = await findDatabase(tables.ITEMS);
    } catch (err) {
      return reject(err);
    }
    for (let i = 0; i < items.length; i++) {
      cache.set(
        cachePaths.ITEM_PREFIX + items[i]._id,
        items[i],
        cacheTtls.ITEM
      );
    }
    return resolve(items);
  });
};
