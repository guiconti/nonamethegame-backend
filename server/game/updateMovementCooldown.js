module.exports = adventurer => {
  if (adventurer.cooldown.movement) {
    adventurer.cooldown.movement -= 1;
  }
  return adventurer;
};
