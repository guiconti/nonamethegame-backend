const entityCanAttack = require('./utils/entityCanAttack');
const entityAttackEntity = require('./entityAttackEntity');

module.exports = (adventurer, adventurerId, mapMetadata) => {
  if (entityCanAttack(adventurer) && adventurer.actions.target) {
    const monster = mapMetadata.monsters[adventurer.actions.target];
    const adventurerPosition = mapMetadata.adventurers[adventurerId].position;
    const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
    const yDistance = Math.abs(monster.position.y - adventurerPosition.y);
    const adventurerInRangeToAttack =
      xDistance <= adventurer.attackRange &&
      yDistance <= adventurer.attackRange;
    if (adventurerInRangeToAttack) {
      entityAttackEntity(adventurer, monster);
    }
  }
};