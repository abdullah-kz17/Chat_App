// src/components/Chat/MessageInput.js
import React, { useState } from "react";
import { Input, Button } from "antd";
import { SendOutlined } from "@ant-design/icons";
import { sendMessageClient } from "../../services/socket";

const MessageInput = ({ chatId, senderId, users }) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      const newMessage = {
        content: message,
        chat: { _id: chatId, users }, // Include users
        sender: { _id: senderId },
      };
      sendMessageClient(newMessage); // Send to WebSocket
      setMessage("");
    }
  };

  return (
    <div style={{ display: "flex", marginTop: "16px" }}>
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onPressEnter={handleSend}
        placeholder="Type a message..."
      />
      <Button
        type="primary"
        icon={<SendOutlined />}
        onClick={handleSend}
        style={{ marginLeft: "8px" }}
      >
        Send
      </Button>
    </div>
  );
};

export default MessageInput;
