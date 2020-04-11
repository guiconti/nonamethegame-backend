const addAttackCooldown = require('./utils/addAttackCooldown');
const { game } = require('../constants');

module.exports = (attacker, defender) => {
  //  For now damage calculation is attack - defense
  const maxAttack = attacker.attack;
  const minAttack = Math.floor(maxAttack * (1 - game.DAMAGE_PERCENTAGE_VARIATION));
  const finalAttack = Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
  const damage = Math.max(finalAttack - defender.defense, 1);
  defender.currentHealth -= damage;
  addAttackCooldown(attacker);
};
