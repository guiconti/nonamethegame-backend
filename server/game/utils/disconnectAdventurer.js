const getConnectedAdventurers = require('./getConnectedAdventurers');
const cache = require('../../utils/cache');
const { cachePaths, cacheTtls } = require('../../utils/constants');

module.exports = async (adventurerId) => {
  let connectedAdventurers;
  try {
    connectedAdventurers = await getConnectedAdventurers();
  } catch(err) {
    return;
  }
  const adventurerIndex = connectedAdventurers.indexOf(adventurerId);
  if (adventurerIndex !== -1) {
    connectedAdventurers.splice(adventurerIndex, 1);
  }
  cache.set(cachePaths.CONNECTED_ADVENTURERS, connectedAdventurers, cacheTtls.CONNECTED_ADVENTURERS);
};