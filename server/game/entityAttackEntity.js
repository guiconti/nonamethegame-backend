const addAttackCooldown = require('./utils/addAttackCooldown');

module.exports = (attacker, defender) => {
  console.log('Attack!');
  addAttackCooldown(attacker);
};
