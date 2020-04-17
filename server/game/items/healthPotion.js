const webSocket = require('../../utils/webSocket');
const { item, sockets } = require('../../constants');

module.exports = (adventurer) => {
  adventurer.currentHealth += item.HEALTH_POTION_HEAL;
  webSocket.emit(adventurer._id, sockets.BATTLE_LOG_MESSAGE, item.HEALTH_POTION_MESSAGE);
};
