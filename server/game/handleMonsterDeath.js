module.exports = (monster, monsterId, mapMetadata) => {
  //  TODO: Send loot, experience and battle message to killer
  delete(mapMetadata.monsters[monsterId]);
};
