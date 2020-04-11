module.exports = adventurer => {
  if (adventurer.cooldown.attack) {
    adventurer.cooldown.attack -= 1;
  }
  return adventurer;
};
