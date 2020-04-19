const addAttackCooldown = require('./utils/addAttackCooldown');
const webSocket = require('../utils/webSocket');
const { game, sockets } = require('../constants');

module.exports = (attacker, defender, sendMessageId = null) => {
  //  For now damage calculation is attack - defense
  let message = '';
  //  Try to hit
  const chanceToHit = attacker.hit / defender.flee;
  if (Math.random() > chanceToHit) { // Miss
    if (attacker._id === sendMessageId) {
      message = `<div>You missed the attack on ${defender.name}.</div>`;
    } else {
      message = `<div>${attacker.name} missed the attack on you.</div>`;
    }
  } else { // Hit
    const maxAttack = attacker.attack;
    const minAttack = Math.floor(
      maxAttack * (1 - game.DAMAGE_PERCENTAGE_VARIATION)
    );
    const finalAttack =
      Math.floor(Math.random() * (maxAttack - minAttack + 1)) + minAttack;
    const damage = Math.max(finalAttack - defender.defense, 1);
    defender.currentHealth -= damage;
    if (defender.currentHealth <= 0) {
      defender.dead = true;
    }
    if (attacker._id === sendMessageId) {
      message = `<div>Dealt <span class="bold">${damage}</span> to ${defender.name}</div>`;
    } else {
      message = `<div>Received <span class="bold">${damage}</span> from ${attacker.name}</div>`;
    }
  }
  if (sendMessageId) {
    webSocket.emit(sendMessageId, sockets.BATTLE_LOG_MESSAGE, message);
  }
  addAttackCooldown(attacker);
};
