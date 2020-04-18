const updateEntityValues = require('./utils/updateEntityValues');

module.exports = async (adventurer) => {
  if (!adventurer.actions.pointsAdded) {
    return;
  }
  const attributesNames = Object.keys(adventurer.attributes);
  let changedAttributes = false;

  for (let i = 0; i < attributesNames.length; i++) {
    const currentAttributePointsAdded =
      adventurer.actions.pointsAdded[attributesNames[i]];
    if (currentAttributePointsAdded) {
      if (
        currentAttributePointsAdded > 0 &&
        currentAttributePointsAdded <= adventurer.pointsToDistribute
      ) {
        changedAttributes = true;
        adventurer.pointsToDistribute -= currentAttributePointsAdded;
        adventurer.attributes[
          attributesNames[i]
        ] += currentAttributePointsAdded;
      }
    }
  }
  adventurer.actions.pointsAdded = null;
  if (changedAttributes) {
    await updateEntityValues(adventurer);
  }
};
