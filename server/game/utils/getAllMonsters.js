const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const getItem = require('./getItem');
const entityMetadataTemplate = require('./entityMetadataTemplate');
const updateEntityValues = require('./updateEntityValues');
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
      const newMonsterMetadataTemplate = entityMetadataTemplate(monsters[i]);
      await updateEntityValues(monsters[i]);
      monsters[i].currentHealth = monsters[i].health;
      monsters[i] = { ...monsters[i], ...newMonsterMetadataTemplate };
      cache.set(
        cachePaths.MONSTER_PREFIX + monsters[i]._id,
        monsters[i],
        cacheTtls.MONSTER
      );
    }
    return resolve(monsters);
  });
};
