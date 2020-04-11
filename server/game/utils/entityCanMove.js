module.exports = entity => {
  return entity.cooldown.movement <= 0;
};