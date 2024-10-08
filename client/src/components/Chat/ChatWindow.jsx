// src/components/Chat/ChatWindow.js
import React, { useEffect, useState } from "react";
import { Card } from "antd";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../../services/socket";

const ChatWindow = ({ chat, userId }) => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (chat) {
      initiateSocket(userId);
      subscribeToChat(chat._id, (newMessage) => {
        setMessages((prevMessages) => [...prevMessages, newMessage]);
      });

      return () => disconnectSocket();
    }
  }, [chat, userId]);

  return (
    <Card
      title={chat?.chatName}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <MessageList messages={messages} style={{ flex: 1, overflowY: "auto" }} />
      <MessageInput chatId={chat._id} senderId={userId} />
    </Card>
  );
};

export default ChatWindow;
