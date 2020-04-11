module.exports = (adventurer) => {
  adventurer.actions = {
    target: adventurer.manualActions && adventurer.manualActions.target
      ? adventurer.manualActions.target
      : adventurer.actions.target,
    movement: adventurer.manualActions && adventurer.manualActions.movement
      ? adventurer.manualActions.movement
      : adventurer.actions.movement,
    attack: adventurer.manualActions && adventurer.manualActions.attack
      ? adventurer.manualActions.attack
      : adventurer.actions.attack,
  };
};
