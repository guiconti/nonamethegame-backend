const equipments = require('../equipments');
const getItem = require('./getItem');

module.exports = async (adventurer) => {
  const equipmentsKeys = Object.keys(adventurer.equipment);
  for (let i = 0; i < equipmentsKeys.length; i++) {
    const equipmentId = adventurer.equipment[equipmentsKeys[i]]._id;
    if (equipmentId) {
      let item;
      try {
        item = await getItem(equipmentId, true);
      } catch(err) {
        //  Handle err
      }
      if (item && equipments[item.fileName]) {
        equipments[item.fileName](adventurer);
      }
    }
  }
};
