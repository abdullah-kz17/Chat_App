const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const messageRoutes = require("./routes/messageRoutes");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const http = require("http");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");
const socketIo = require("socket.io"); // Update import

dotenv.config();
connectDB();
const app = express();

const corsOptions = {
  origin: "http://localhost:5173",
  methods: ["GET", "POST", "PUT", "DELETE"], // Updated methods
  credentials: true,
  allowedHeaders: [
    "Origin",
    "X-Requested-With",
    "Content-Type",
    "Authorization",
  ],
};
app.use(cors(corsOptions));
app.use(express.json()); // to accept JSON data

app.use("/api/user", userRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/chat", chatRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 6000;
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("New client connected");

  // Joining a chat room
  socket.on("join chat", (chatId) => {
    if (chatId) {
      socket.join(chatId);
      console.log("User joined chat: ", chatId);
    } else {
      console.log("No chatId provided");
    }
  });

  // Handling new messages
  socket.on("new message", (newMessage) => {
    try {
      const chat = newMessage.chat;
      if (!chat || !chat.users) {
        return console.log("Chat or chat users not defined");
      }
      io.to(chat._id).emit("message received", newMessage);
    } catch (error) {
      console.error("Error in message broadcast:", error.message);
    }
  });

  // Handling disconnection
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
