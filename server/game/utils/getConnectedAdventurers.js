const cache = require('../../utils/cache');
const { cachePaths } = require('../../constants');

module.exports = () => {
  return new Promise((resolve) => {
    let connectedPlayers = cache.get(cachePaths.CONNECTED_ADVENTURERS);
    if (!connectedPlayers) {
      connectedPlayers = [];
    }
    return resolve(connectedPlayers);
  });
}