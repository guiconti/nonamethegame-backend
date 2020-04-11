const entityCanAttack = require('./utils/entityCanAttack');
const entityAttackEntity = require('./entityAttackEntity');

module.exports = (monster, monsterId, mapMetadata) => {
  if (entityCanAttack(monster) && monster.actions.target) {
    const adventurer = mapMetadata.adventurers[monster.actions.target];
    const monsterPosition = mapMetadata.monsters[monsterId].position;
    const xDistance = Math.abs(adventurer.position.x - monsterPosition.x);
    const yDistance = Math.abs(adventurer.position.y - monsterPosition.y);
    const monsterInRangeToAttack =
      xDistance <= monster.attackRange &&
      yDistance <= monster.attackRange;
    if (monsterInRangeToAttack) {
      entityAttackEntity(monster, adventurer);
    }
  }
};
