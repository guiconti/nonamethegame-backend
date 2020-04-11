const entityCanAttack = require('./utils/entityCanAttack');
const entityAttackEntity = require('./entityAttackEntity');

module.exports = (
  adventurersMapMetadatas,
  adventurer,
  adventurerId,
  monstersIds,
  mapMetadata
) => {
  for (let i = 0; i < monstersIds.length; i++) {
    const monsterId = monstersIds[i];
    const monster = mapMetadata.monsters[monsterId];
    const adventurerPosition = mapMetadata.adventurers[adventurerId].position;
    const xDistance = Math.abs(monster.position.x - adventurerPosition.x);
    const yDistance = Math.abs(monster.position.y - adventurerPosition.y);

    //  Add to map vision if close enough
    if (
      xDistance <= adventurer.sightRange &&
      yDistance <= adventurer.sightRange
    ) {
      adventurersMapMetadatas[adventurerId].monsters[monsterId] =
        mapMetadata.monsters[monsterId];
    }

    //  Check if they will attack each other. First monster then adventurer
    if (entityCanAttack(monster) && monster.actions.target === adventurerId) {
      const monsterInRangeToAttack =
        xDistance <= monster.attackRange && yDistance <= monster.attackRange;
      if (monsterInRangeToAttack) {
        entityAttackEntity(monster, adventurer);
      } else {
        //  Move monster in direction of target
      }
    }

    if (
      entityCanAttack(adventurer) &&
      adventurer.actions.target === monsterId
    ) {
      const adventurerInRangeToAttack =
        xDistance <= adventurer.attackRange &&
        yDistance <= adventurer.attackRange;
      if (adventurerInRangeToAttack) {
        entityAttackEntity(adventurer, monster);
      }
    }

    //  Move monsters

  }
};
