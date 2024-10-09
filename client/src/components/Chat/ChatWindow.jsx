import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import {
  initiateSocket,
  subscribeToChat,
  disconnectSocket,
} from "../../services/socket";
import axios from "axios";

const ChatWindow = ({ chat, userId, currentUser }) => {
  const [messages, setMessages] = useState([]); // Ensure initial state is an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (chat) {
      const fetchMessages = async () => {
        try {
          const { data } = await axios.get(`/api/message/${chat._id}`);
          console.log("Fetched messages:", data.messages); // Debug log
          setMessages(data.messages || []); // Default to empty array if messages are undefined
          setLoading(false);
        } catch (error) {
          console.error("Error fetching messages", error);
          setLoading(false);
        }
      };

      fetchMessages();

      initiateSocket(userId);
      subscribeToChat(chat._id, (newMessage) => {
        console.log("New message received:", newMessage); // Debug log
        if (newMessage && newMessage.sender) {
          // Validate newMessage
          setMessages((prevMessages) => [...prevMessages, newMessage]);
        } else {
          console.error("Received invalid message:", newMessage);
        }
      });

      return () => disconnectSocket();
    }
  }, [chat, userId]);

  if (loading) {
    return <Spin size="large" />;
  }

  return (
    <Card
      title={chat?.chatName}
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <MessageList
        messages={messages}
        currentUser={currentUser}
        style={{ flex: 1, overflowY: "auto" }}
      />
      <MessageInput chatId={chat._id} senderId={userId} users={chat.users} />
    </Card>
  );
};

export default ChatWindow;
