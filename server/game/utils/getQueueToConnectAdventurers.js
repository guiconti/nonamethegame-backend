const cache = require('../../utils/cache');
const { cachePaths } = require('../../utils/constants');

module.exports = () => {
  return new Promise((resolve) => {
    let queueToConnectAdventurers = cache.get(cachePaths.QUEUE_TO_CONNECT_ADVENTURERS);
    if (!queueToConnectAdventurers) {
      queueToConnectAdventurers = [];
    }
    return resolve(queueToConnectAdventurers);
  });
};
