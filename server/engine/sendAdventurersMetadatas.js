const webSocket = require('../utils/webSocket');
const { sockets } = require('../constants');

module.exports = (adventurersMetadatas) => {
  return new Promise(() => {
    const adventurersIds = Object.keys(adventurersMetadatas);
    for (let i = 0; i < adventurersIds.length; i++) {
      webSocket.emit(
        adventurersIds[i],
        sockets.GAME_METADATA,
        adventurersMetadatas[adventurersIds[i]]
      );
    }
  });
};
