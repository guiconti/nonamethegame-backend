const socketIO = require('socket.io');
const { sockets, values } = require('./constants');
const tokenDecryptor = require('./tokenDecryptor');
const { isValidString } = require('./validator');

let io;

const parseCookie = (str) =>
  str
    .split(';')
    .map((v) => v.split('='))
    .reduce((acc, v) => {
      acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
      return acc;
    }, {});

exports.emit = (namespace, type, content) => {
  io.to(namespace).emit(type, content);
};

exports.initialize = (server) => {
  io = socketIO(server);

  io.on(sockets.CONNECT, (socket) => {
    const cookies = parseCookie(socket.handshake.headers.cookie);
    if (!cookies || !isValidString(cookies.session)) {
      socket.disconnect(true);
    }
    const _id = tokenDecryptor(
      cookies.session,
      values.cryptography.SESSION_SIGNATURE_KEY
    );
    if (!_id) {
      socket.disconnect(true);
    }
    socket.join(_id);
  });  
};
