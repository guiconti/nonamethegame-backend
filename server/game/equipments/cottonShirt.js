const { equipments } = require('../../constants');

module.exports = (adventurer) => {
  adventurer.defense += equipments.COTTON_SHIRT_DEFENSE_BONUS;
};