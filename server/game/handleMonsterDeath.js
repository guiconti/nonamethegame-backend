const webSocket = require('../utils/webSocket');
const { sockets } = require('../constants');

module.exports = (monster, monsterId, map) => {
  //  TODO: Send loot, experience and battle message to killer
  delete(map.metadata.monsters[monsterId]);
  map.spawn[monster._id].spawned--;
  const message = `You killed ${monster.name}. Received 32 XP and 1x Slime Blob`;
  webSocket.emit(monster.killer, sockets.BATTLE_LOG_MESSAGE, message);
};
