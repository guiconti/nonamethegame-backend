const logger = require('javascript-custom-logger');
const getItem = require('./utils/getItem');
const items = require('./items');

module.exports = async (adventurer) => {
  if (!adventurer.actions.item) {
    return;
  }
  let item;
  try {
    item = await getItem(adventurer.actions.item._id, true);
  } catch(err) {
    logger.error(err);
    return;
  }
  const itemType = item.type.toLowerCase();
  if (!adventurer.inventory[itemType][item._id]) {
    adventurer.actions.item = null;
    return;
  }
  if (items[item.fileName]) {
    items[item.fileName](adventurer);
  }
  adventurer.inventory[itemType][item._id].amount--;
  if (adventurer.inventory[itemType][item._id].amount <= 0) {
    delete(adventurer.inventory[itemType][item._id]);
  }
  adventurer.actions.item = null;
}