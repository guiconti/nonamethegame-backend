const { game } = require('../../constants');

module.exports = (entity) => {
  return {
    actions: {
      movement: null,
      target: null,
      attack: null,
      item: null,
      pointsAdded: null,
    },
    cooldown: {
      movement: 0,
      attack: 0,
    },
  };
};
