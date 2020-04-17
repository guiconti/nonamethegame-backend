const logger = require('javascript-custom-logger');
const getItem = require('./utils/getItem');
const consumables = require('./consumables');
const { item: itemConstants } = require('../constants');

module.exports = async (adventurer) => {
  if (!adventurer.actions.item) {
    return;
  }
  let item;
  try {
    item = await getItem(adventurer.actions.item._id, true);
  } catch (err) {
    logger.error(err);
    return;
  }
  const itemType = item.type.toLowerCase();
  if (!adventurer.inventory[itemType][item._id]) {
    adventurer.actions.item = null;
    return;
  }
  switch (adventurer.actions.item.option) {
    case itemConstants.USE_OPTION:
      if (consumables[item.fileName]) {
        consumables[item.fileName](adventurer);
      }
      break;
    case itemConstants.EQUIP_OPTION:
      if (adventurer.equipment[item.position] && adventurer.equipment[item.position]._id) {
        const currentItem = JSON.parse(
          JSON.stringify(adventurer.equipment[item.position])
        );
        if (!adventurer.inventory[itemType][currentItem._id]) {
          adventurer.inventory[itemType][currentItem._id] = {
            amount: 0,
          };
        }
        adventurer.inventory[itemType][currentItem._id].amount++;
      }
      adventurer.equipment[item.position] = {
        _id: item._id,
      };
      //  TODO: Recalculate status
      break;
    default:
      break;
  }
  adventurer.inventory[itemType][item._id].amount--;
  if (adventurer.inventory[itemType][item._id].amount <= 0) {
    delete adventurer.inventory[itemType][item._id];
  }
  adventurer.actions.item = null;
};
