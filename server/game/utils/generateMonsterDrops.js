const getItem = require('./getItem');

module.exports = async (monster) => {
  const drops = [];
  for (let i = 0; i < monster.drops.length; i++) {
    if (Math.random() <= monster.drops[i].chance) {
      drops.push(
        JSON.parse(JSON.stringify(await getItem(monster.drops[i]._id)))
      );
    }
  }
  return drops;
};
