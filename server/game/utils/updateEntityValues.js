const { game, engine } = require('../../constants');

module.exports = (entity) => {
  const {
    baseAttack,
    baseMagicAttack,
    baseDefense,
    baseMagicDefense,
    baseHit,
    baseFlee,
    baseHealth,
    baseMana,
    baseMovementSpeed,
    baseAttackSpeed,
  } = entity;
  const {
    strength,
    intelligence,
    agility,
    dexterity,
    vitality,
  } = entity.attributes;
  entity.attack = Math.floor(
    baseAttack +
      game.STRENGTH_MULTIPLIER_TO_ATTACK * strength +
      game.DEXTERITY_MULTIPLIER_TO_ATTACK * dexterity
  );
  entity.magicAttack = Math.floor(
    baseMagicAttack +
      game.INTELLIGENCE_MULTIPLIER_TO_MAGIC_ATTACK * intelligence
  );
  entity.defense = Math.floor(
    baseDefense + game.VITALITY_MULTIPLIER_TO_DEFENSE * vitality
  );
  entity.magicDefense = Math.floor(
    baseMagicDefense +
      game.VITALITY_MULTIPLIER_TO_MAGIC_DEFENSE * vitality +
      game.INTELLIGENCE_MULTIPLIER_TO_MAGIC_DEFENSE * intelligence
  );
  entity.hit = Math.floor(
    baseHit + game.DEXTERITY_MULTIPLIER_TO_HIT * dexterity
  );
  entity.flee = Math.floor(
    baseFlee + game.AGILITY_MULTIPLIER_TO_FLEE * agility
  );
  entity.health = Math.floor(
    baseHealth + game.VITALITY_INCREMENT_TO_HEALTH * vitality
  );
  entity.mana = Math.floor(
    baseMana + game.INTELLIGENCE_INCREMENT_TO_MANA * intelligence
  );
  entity.movementSpeed = Math.floor(engine.TICK_RATE / baseMovementSpeed);
  entity.attackSpeed = Math.floor(engine.TICK_RATE / baseAttackSpeed);
};
