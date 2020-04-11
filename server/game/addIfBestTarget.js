module.exports = (
  entity,
  entityPosition,
  possibleTarget,
  possibleTargetPosition
) => {
  const xDistance = Math.abs(entityPosition.x - possibleTargetPosition.x);
  const yDistance = Math.abs(entityPosition.y - possibleTargetPosition.y);

  if (xDistance > entity.sightRange || yDistance > entity.sightRange) {
    return;
  }

  if (entity.temporaryTarget) {
    const currentTargetXDistance = Math.abs(
      entityPosition.x - entity.temporaryTarget.position.x
    );
    const currentTargetYDistance = Math.abs(
      entityPosition.y - entity.temporaryTarget.position.y
    );
    if (
      currentTargetXDistance + currentTargetYDistance <=
      xDistance + yDistance
    ) {
      return;
    }
  }
  entity.actions.target = possibleTarget._id;
  entity.temporaryTarget = possibleTarget;
  entity.temporaryTarget.position = possibleTarget.position;
};
