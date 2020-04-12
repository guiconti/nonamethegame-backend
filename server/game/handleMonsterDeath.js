const generateMonsterDrops = require('./utils/generateMonsterDrops');
const webSocket = require('../utils/webSocket');
const { sockets } = require('../constants');

module.exports = async (monster, monsterId, map) => {
  //  TODO: Send loot, experience and battle message to killer
  delete map.metadata.monsters[monsterId];
  map.spawn[monster._id].spawned--;
  const drops = await generateMonsterDrops(monster);
  let dropsText = ``;
  if (drops.length > 0) {
    dropsText = ` Received `;
    for (let i = 0; i < drops.length; i++) {
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
