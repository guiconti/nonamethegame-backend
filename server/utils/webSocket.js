const socketIO = require('socket.io');
const { sockets, values, tables, selections } = require('../constants');
const tokenDecryptor = require('./tokenDecryptor');
const findDatabase = require('./findDatabase');
const disconnectAdventurer = require('../game/utils/disconnectAdventurer');
const addManualAction = require('../game/addManualAction');
const { isValidString, isValidMovement } = require('./validator');

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

  io.on(sockets.CONNECT, async (socket) => {
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
    let adventurerId;
    try {
      const user = await findDatabase(
        tables.USERS,
        { _id },
        selections.USER_WITH_PROFILE_DATA,
        0,
        1
      );
      adventurerId = String(user.selectedAdventurer._id);
    } catch(err) {
      return;
    }
    socket.join(_id);
    socket.join(adventurerId);
    this.emit(adventurerId, sockets.CONNECTED);
    socket.on(sockets.DISCONNECT, () => {
      disconnectAdventurer(adventurerId);
    });
    socket.on(sockets.ADVENTURER_MOVE, async movement => {
      if (!isValidMovement(movement)) {
        return;
      }
      addManualAction(adventurerId, { movement });
    });
    socket.on(sockets.TARGET_MONSTER, async target => {
      addManualAction(adventurerId, { target });
    })
  });
};
