const entityCanAttack = require('./utils/entityCanAttack');
const entityAttackEntity = require('./entityAttackEntity');

module.exports = (adventurer, mapMetadata) => {
  if (entityCanAttack(adventurer) && adventurer.actions.target) {
    const monster = mapMetadata.monsters[adventurer.actions.target];
    if (!monster) {
      adventurer.actions.target = null;
      return;
    }
    const adventurerPosition = adventurer.currentMap.position;
    const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
    const yDistance = Math.abs(monster.position.y - adventurerPosition.y);
    const adventurerInRangeToAttack =
      xDistance <= adventurer.attackRange &&
      yDistance <= adventurer.attackRange;
    if (adventurerInRangeToAttack) {
      entityAttackEntity(adventurer, monster, adventurer._id);
      if (monster.dead) {
        monster.killer = adventurer._id; 
      }
    } else {
      const monsterInSight =
        xDistance <= adventurer.sightRange &&
        yDistance <= adventurer.sightRange;
      if (!monsterInSight) {
        adventurer.actions.target = null;
      }
    }
  }
};
