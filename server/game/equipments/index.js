const fs = require('fs');
const path = require('path');
const { paths } = require('../../constants');

const equipments = {};

try {
  // Get our routers
  fs.readdirSync(paths.EQUIPMENTS).forEach(file => {
    if (file.indexOf('.js') !== -1 && file !== path.basename(__filename)) {
      /* eslint-disable-next-line global-require, import/no-dynamic-require */
      equipments[file.split('.')[0]] = require(`${paths.EQUIPMENTS}${file}`);
    }
  });
} catch (err) {
  //  TODO: Throw error
}

module.exports = equipments;
