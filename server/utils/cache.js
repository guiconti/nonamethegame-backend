const NodeCache = require('node-cache');

const cache = new NodeCache({ checkperiod: 0 });
module.exports = cache;
