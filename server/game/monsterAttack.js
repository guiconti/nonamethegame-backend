const entityCanAttack = require('./utils/entityCanAttack');
const entityAttackEntity = require('./entityAttackEntity');

module.exports = (monster, monsterId, adventurersMetadata, mapMetadata) => {
  if (entityCanAttack(monster) && monster.actions.target) {
    const adventurer = adventurersMetadata[monster.actions.target];
    const monsterPosition = mapMetadata.monsters[monsterId].position;
    const xDistance = Math.abs(adventurer.currentMap.position.x - monsterPosition.x);
    const yDistance = Math.abs(adventurer.currentMap.position.y - monsterPosition.y);
    const monsterInRangeToAttack =
      xDistance <= monster.attackRange &&
      yDistance <= monster.attackRange;
    if (monsterInRangeToAttack) {
      entityAttackEntity(monster, adventurer, adventurer._id);
    } else {
      monster.actions.target = null;
    }
  }
};
