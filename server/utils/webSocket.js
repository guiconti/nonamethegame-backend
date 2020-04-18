const socketIO = require('socket.io');
const parseCookie = require('./parseCookie');
const { sockets, values, tables, selections, item } = require('../constants');
const tokenDecryptor = require('./tokenDecryptor');
const findDatabase = require('./findDatabase');
const disconnectAdventurer = require('../game/utils/disconnectAdventurer');
const addManualAction = require('../game/addManualAction');
const { isValidString, isValidMovement } = require('./validator');

let io;

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
    socket.on(sockets.USE_ITEM, async itemId => {
      const action = {
        item: {
          _id: itemId,
          option: item.USE_OPTION,
        },
      };
      addManualAction(adventurerId, action);
    });
    socket.on(sockets.EQUIP_ITEM, async itemId => {
      const action = {
        item: {
          _id: itemId,
          option: item.EQUIP_OPTION,
        },
      };
      addManualAction(adventurerId, action);
    });
    socket.on(sockets.ADD_POINTS, async pointsAdded => {
      const action = {
        pointsAdded,
      }
      addManualAction(adventurerId, action)
    });
  });
};
