const fs = require('fs');
const path = require('path');
const { paths } = require('../../constants');

const consumables = {};

try {
  // Get our routers
  fs.readdirSync(paths.CONSUMABLES).forEach(file => {
    if (file.indexOf('.js') !== -1 && file !== path.basename(__filename)) {
      /* eslint-disable-next-line global-require, import/no-dynamic-require */
      consumables[file.split('.')[0]] = require(`${paths.CONSUMABLES}${file}`);
    }
  });
} catch (err) {
  //  TODO: Throw error
}

module.exports = consumables;
