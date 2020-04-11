const generateUniqueId = require('../utils/generateUniqueId');
const getMonster = require('./utils/getMonster');
const getAnAvailablePosition = require('./utils/getAnAvailablePosition');

module.exports = async (map) => {
  for (let i = 0; i < map.spawn.length; i++) {
    const leftToSpawn = map.spawn[i].amount - map.spawn[map.spawn[i].id].spawned;
    for (let j = 0; j < leftToSpawn; j++) {
      const monsterId = map.spawn[i].id + generateUniqueId();
      map.metadata.monsters[monsterId] = await getMonster(
        map.spawn[i].id
      );
      map.spawn[map.spawn[i].id].spawned++;
      map.metadata.monsters[monsterId].position = getAnAvailablePosition(map);
    }
  }
}