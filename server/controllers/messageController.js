const asyncHandler = require("express-async-handler");
const Message = require("../models/messageModel");

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;
  console.log("Received request body:", req.body);
  if (!content || !chatId) {
    console.log(
      "Invalid data passed into request. Content:",
      content,
      "ChatId:",
      chatId
    );
    return res.status(400).json({ message: "Content and chatId are required" });
  }

  var newMessage = {
    sender: req.user._id,
    content: content,
    chat: chatId,
  };

  try {
    var message = await Message.create(newMessage);

    message = await Message.findById(message._id)
      .populate("sender", "name pic")
      .populate("chat");

    res.json(message);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await Message.find({ chat: req.params.chatId })
      .populate("sender", "name pic email")
      .populate("chat");
    res.json(messages);
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

module.exports = { sendMessage, allMessages };
