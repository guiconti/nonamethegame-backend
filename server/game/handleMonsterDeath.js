module.exports = (monster, monsterId, map) => {
  //  TODO: Send loot, experience and battle message to killer
  delete(map.metadata.monsters[monsterId]);
  map.spawn[monster._id].spawned--;
};
