const dotenv = require('dotenv');
dotenv.config();

const app =
  process.env.NODE_ENV == 'production'
    ? require('./serverProduction')
    : require('./serverDevelopment');
const { PORT } = process.env;

const server = require('http').createServer(app);
require('../server/utils/webSocket').initialize(server);

server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.info('🌎  Server is listening on port %s.', PORT);
  }
});
