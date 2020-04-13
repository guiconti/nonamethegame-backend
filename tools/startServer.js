const http = require('http');
const dotenv = require('dotenv');

dotenv.config();

const Engine = require('../server/engine');
const webSocket = require('../server/utils/webSocket');
const app =
  process.env.NODE_ENV === 'production'
    ? require('./serverProduction')
    : require('./serverDevelopment');
const { PORT } = process.env;

const server = http.createServer(app);
webSocket.initialize(server);
const engine = new Engine();
engine.start();

server.listen(PORT, (error) => {
  if (error) {
    console.log(error);
  } else {
    console.info('🌎  Server is listening on port %s.', PORT);
  }
});
