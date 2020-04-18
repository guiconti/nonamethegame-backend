module.exports = (adventurer) => {
  adventurer.actions = {
    target:
      adventurer.manualActions &&
      (adventurer.manualActions.target ||
        adventurer.manualActions.target === '')
        ? adventurer.manualActions.target
        : adventurer.actions.target,
    movement:
      adventurer.manualActions && adventurer.manualActions.movement
        ? adventurer.manualActions.movement
        : adventurer.actions.movement,
    attack:
      adventurer.manualActions && adventurer.manualActions.attack
        ? adventurer.manualActions.attack
        : adventurer.actions.attack,
    item:
      adventurer.manualActions && adventurer.manualActions.item
        ? adventurer.manualActions.item
        : adventurer.actions.item,
    pointsAdded:
      adventurer.manualActions && adventurer.manualActions.pointsAdded
        ? adventurer.manualActions.pointsAdded
        : adventurer.actions.pointsAdded,
  };
};
