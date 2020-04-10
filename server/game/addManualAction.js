const cache = require('../utils/cache');
const { cachePaths, cacheTtls } = require('../constants');
const adventurerActionsTemplate = require('./utils/adventurerActionsTemplate');

module.exports = (adventurerId, manualActions) => {
  //  Making sure we don't fall in shallow clone problems
  let actions = JSON.parse(JSON.stringify(adventurerActionsTemplate));
  actions = { ...actions, ...manualActions };
  cache.set(
    cachePaths.ADVENTURER_MANUAL_ACTIONS_PREFIX + adventurerId,
    actions,
    cacheTtls.ADVENTURER_MANUAL_ACTIONS
  );
};
