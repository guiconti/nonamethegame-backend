const findDatabase = require('../../utils/findDatabase');
const cache = require('../../utils/cache');
const entityMetadataTemplate = require('./entityMetadataTemplate');
const updateEntityValues = require('./updateEntityValues');
const {
  cachePaths,
  cacheTtls,
  tables,
} = require('../../constants');

let alreadyRetrievingMonster = false;

module.exports = (monsterId, onlyFromCache) => {
  return new Promise(async (resolve, reject) => {
    let monster = cache.get(cachePaths.MONSTER_PREFIX + monsterId);
    if (monster) {
      return resolve(monster);
    }
    if (onlyFromCache) {
      reject();
    }
    if (alreadyRetrievingMonster) {
      return reject();
    }
    alreadyRetrievingMonster = true;
    try {
      monster = await findDatabase(tables.MONSTERS, { _id: monsterId }, [], 0, 1);
    } catch (err) {
      return reject(err);
    }
    const newMonsterMetadataTemplate = entityMetadataTemplate(monster);
    updateEntityValues(monster);
    monster.currentHealth = monster.health;
    monster = { ...monster, ...newMonsterMetadataTemplate };
    cache.set(cachePaths.MONSTER_PREFIX + monsterId, monster, cacheTtls.MONSTER);
    alreadyRetrievingMonster = false;
    return resolve(monster);
  });
};
