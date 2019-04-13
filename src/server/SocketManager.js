const io = require('./index.js').io
const { VERIFY_USER, USER_CONNECTED, LOGOUT } = require('../Events');

const { createUser, createMessage, createChat } = require('../Factories');

let connectedUsers = {}

function addUser(userTable, user) {
  let newList = Object.assign({}, userTable);
  newList[user.name] = user;
  return newList
}

function removeUser(userTable, username) {
  let newList = Object.assign({}, userTable)

  delete newList[username];
  return newList;
}

function isUser(userTable, username) {
  return userTable.hasOwnProperty(username);
}

module.exports = function (socket) {
  console.log("Socket ID" + socket.id);

  socket.on(VERIFY_USER, (nickname, callback) => {
    if (isUser(connectedUsers, nickname)) {
      callback({ isUser: true, user: null });
    } else {
      callback({ isUser: false, user: createUser({ name: nickname }) });
    }
  });

  socket.on(USER_CONNECTED, (user) => {
    connectedUsers = addUser(connectedUsers, user);
    socket.user = user;

    io.emit(USER_CONNECTED, connectedUsers)
    console.log(connectedUsers);
  });
}
