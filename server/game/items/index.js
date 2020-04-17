const fs = require('fs');
const path = require('path');
const { paths } = require('../../constants');

const items = {};

try {
  // Get our routers
  fs.readdirSync(paths.ITEMS).forEach(file => {
    if (file.indexOf('.js') !== -1 && file !== path.basename(__filename)) {
      /* eslint-disable-next-line global-require, import/no-dynamic-require */
      items[file.split('.')[0]] = require(`${paths.ITEMS}${file}`);
    }
  });
} catch (err) {
  //  TODO: Throw error
}

module.exports = items;
