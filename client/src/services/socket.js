// src/services/socket.js
import { io } from "socket.io-client";

const SOCKET_URL = "http://localhost:5000"; // your backend URL
let socket;

export const initiateSocket = (userId) => {
  socket = io(SOCKET_URL);
  console.log("Connecting to socket...");
  socket.emit("setup", userId);
};

export const subscribeToChat = (chatId, cb) => {
  if (!socket) return;
  socket.emit("join chat", chatId);
  socket.on("message received", (message) => {
    console.log("New message received:", message);
    return cb(message);
  });
};

export const sendMessageClient = (newMessage) => {
  if (socket) socket.emit("new message", newMessage);
};

export const disconnectSocket = () => {
  console.log("Disconnecting socket...");
  if (socket) socket.disconnect();
};
