const { equipments } = require('../../constants');

module.exports = (adventurer) => {
  adventurer.defense += equipments.JACKET_DEFENSE_BONUS;
};