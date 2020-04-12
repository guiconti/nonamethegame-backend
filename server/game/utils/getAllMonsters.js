const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const getItem = require('./getItem');
const { cachePaths, cacheTtls, tables } = require('../../constants');

module.exports = () => {
  return new Promise(async (resolve, reject) => {
    let monsters;
    try {
      monsters = await findDatabase(tables.MONSTERS);
    } catch (err) {
      return reject(err);
    }
    for (let i = 0; i < monsters.length; i++) {
      for (let j = 0; j < monsters[i].drops.length; j++) {
        const item = await getItem(monsters[i].drops[j].id);
        monsters[i].drops[j] = { ...monsters[i].drops[j], ...item };
      }
      cache.set(
        cachePaths.MONSTER_PREFIX + monsters[i]._id,
        monsters[i],
        cacheTtls.MONSTER
      );
    }
    return resolve(monsters);
  });
};
