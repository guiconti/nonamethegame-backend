const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../constants');

module.exports = (adventurerId, manualActions) => {
  //  Making sure we don't fall in shallow clone problems
  cache.set(
    cachePaths.ADVENTURER_MANUAL_ACTIONS_PREFIX + adventurerId,
    manualActions,
    cacheTtls.ADVENTURER_MANUAL_ACTIONS
  );
};
