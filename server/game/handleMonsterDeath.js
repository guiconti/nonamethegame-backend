const generateMonsterDrops = require('./utils/generateMonsterDrops');
const checkAndHandleLevelUp = require('./utils/checkAndHandleLevelUp');
const webSocket = require('../utils/webSocket');
const { sockets } = require('../constants');

module.exports = async (monster, monsterId, adventurersMetadatas, map) => {
  delete map.metadata.monsters[monsterId];
  map.spawn[monster._id].spawned--;
  const drops = await generateMonsterDrops(monster);
  const adventurer = adventurersMetadatas[monster.killer];
  adventurer.experience += monster.experience;
  checkAndHandleLevelUp(adventurer);
  let dropsText = ``;
  if (drops.length > 0) {
    dropsText = ` Received `;
    for (let i = 0; i < drops.length; i++) {
      delete(drops[i].id);
      if (!adventurer.inventory[drops[i].type][drops[i]._id]) {
        adventurer.inventory[drops[i].type][drops[i]._id] = {
          amount: 0
        };
      }
      adventurer.inventory[drops[i].type][drops[i]._id].amount++;
      if (i > 0) {
        if (i === drops.length - 1) {
          dropsText += ', ';
        } else {
          dropsText += ' and ';
        }
      }
      dropsText += `1x ${drops[i].name}`
    }
    dropsText += '.';
  }
  const message = `You killed ${monster.name}. Received ${monster.experience} XP.${dropsText}`;
  webSocket.emit(monster.killer, sockets.BATTLE_LOG_MESSAGE, message);
};
