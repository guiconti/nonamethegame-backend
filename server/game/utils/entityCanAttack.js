module.exports = entity => {
  return entity.cooldown.attack <= 0;
};